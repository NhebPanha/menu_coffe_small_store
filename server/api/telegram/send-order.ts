const TOPPING_PRICE = 0.25
const TOPPING_LABELS: Record<string, string> = { cream: 'Cream', pearls: 'Pearls' }
const TZ = 'Asia/Phnom_Penh'

// In-memory daily invoice counter (resets when the server restarts / new day)
let lastDateKey = ''
let seq = 0
const nextInvoiceNo = (dateKey: string) => {
  if (dateKey !== lastDateKey) {
    lastDateKey = dateKey
    seq = 0
  }
  seq++
  return `INV-${dateKey}-${String(seq).padStart(3, '0')}`
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const botToken = process.env.NUXT_TELEGRAM_BOT_TOKEN
  const chatId = process.env.NUXT_TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return {
      success: false,
      error: 'Telegram credentials not configured'
    }
  }

  try {
    const { customerName, customerPhone, tableNumber, items } = body
    const now = new Date()

    // Parse chat_id as number if it's numeric, otherwise use as string
    const parsedChatId = isNaN(Number(chatId)) ? chatId : Number(chatId)

    // 04 Jun 2026
    const dateStr = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric', timeZone: TZ
    }).format(now)

    // 2:41 PM
    const timeStr = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric', minute: '2-digit', hour12: true, timeZone: TZ
    }).format(now)

    // YYYYMMDD for the invoice id
    const p = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric', month: '2-digit', day: '2-digit', timeZone: TZ
    }).formatToParts(now).reduce((a, x) => (a[x.type] = x.value, a), {} as Record<string, string>)
    const dateKey = `${p.year}${p.month}${p.day}`
    const invoiceNo = nextInvoiceNo(dateKey)

    const line = '════════════════════'
    let m = `🧾 ORDER INVOICE\n\n`
    m += `${line}\n`
    m += `🏪 Stardust Cafe\n`
    m += `🆔 Invoice No: ${invoiceNo}\n`
    m += `📅 Date: ${dateStr}\n`
    m += `⏰ Time: ${timeStr}\n`
    m += `${line}\n\n`
    m += `👤 Customer: ${customerName || 'Guest'}\n`
    if (customerPhone) m += `📱 Phone: ${customerPhone}\n`
    if (tableNumber) m += `🪑 Table: ${tableNumber}\n`
    m += `\n☕ Order Details\n\n`

    let subtotal = 0
    let discount = 0
    items.forEach((item: any, i: number) => {
      const tops = Object.keys(TOPPING_LABELS).filter(k => item.toppings?.[k])
      const addonCost = tops.length * TOPPING_PRICE
      const onPromo = typeof item.oldPrice === 'number' && item.oldPrice > item.price
      // bill against the original price; promo saving is collected into `discount`
      const baseUnit = onPromo ? item.oldPrice : item.price
      const unit = baseUnit + addonCost
      const lineSubtotal = unit * item.quantity
      const lineDiscount = onPromo ? (item.oldPrice - item.price) * item.quantity : 0
      subtotal += lineSubtotal
      discount += lineDiscount

      m += `${i + 1}. ${item.en} (${item.kh})${item.zh ? ` ${item.zh}` : ''}\n`
      m += `   Qty      : ${item.quantity}\n`
      if (onPromo) {
        m += `   Unit     : $${item.price.toFixed(2)} (was $${item.oldPrice.toFixed(2)})\n`
      } else {
        m += `   Unit     : $${item.price.toFixed(2)}\n`
      }
      if (tops.length) {
        m += `   Add-on   : ${tops.map(k => TOPPING_LABELS[k]).join(', ')} (+$${addonCost.toFixed(2)})\n`
      }
      m += `   Sugar    : ${item.sugar ?? 100}%\n`
      if (lineDiscount > 0) {
        m += `   🏷️ Save   : -$${lineDiscount.toFixed(2)}\n`
      }
      m += `   Subtotal : $${lineSubtotal.toFixed(2)}\n\n`
    })

    const tax = 0
    const total = subtotal + tax - discount

    m += `${line}\n`
    m += `💰 Payment Summary\n\n`
    m += `Subtotal : $${subtotal.toFixed(2)}\n`
    m += `Tax      : $${tax.toFixed(2)}\n`
    m += `Discount : $${discount.toFixed(2)}\n\n`
    m += `🟢 TOTAL : $${total.toFixed(2)}\n`
    m += `${line}\n\n`
    m += `🙏 Thank You For Your Order!\n`
    m += `Have a great day ☕\n`
    m += `${line}`

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: parsedChatId,
        text: m
      })
    })

    const result = await response.json()

    if (!response.ok || !result.ok) {
      // Telegram returns the real reason in `description` — surface it instead of a vague "Bad Request"
      throw new Error(
        `Telegram API error ${result.error_code ?? response.status}: ${result.description ?? response.statusText}`
      )
    }

    return {
      success: result.ok,
      invoiceNo,
      messageId: result.result?.message_id
    }
  } catch (error) {
    console.error('Telegram error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send order'
    }
  }
})
