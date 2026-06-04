export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  
  if (!botToken || !chatId) {
    return {
      success: false,
      error: 'Telegram credentials not configured'
    }
  }
  
  try {
    const { customerName, tableNumber, items, totalPrice } = body
    
    let message = `🛍️ *New Order Received*\n\n`
    message += `👤 *Customer:* ${customerName || 'Guest'}\n`
    if (tableNumber) {
      message += `🪑 *Table:* ${tableNumber}\n`
    }
    message += `\n*Items:*\n`
    
    const TOPPING_PRICE = 0.25
    const TOPPING_LABELS: Record<string, string> = { cream: 'Cream', pearls: 'Pearls' }

    items.forEach((item: any) => {
      const tops = Object.keys(TOPPING_LABELS).filter(k => item.toppings?.[k])
      const unit = item.price + tops.length * TOPPING_PRICE
      message += `• ${item.en} (${item.kh})`
      if (item.zh) message += ` [${item.zh}]`
      message += ` x${item.quantity} = $${(unit * item.quantity).toFixed(2)}\n`
      message += `   🍬 Sugar ${item.sugar ?? 100}%\n`
      if (tops.length) {
        message += `   ➕ ${tops.map(k => TOPPING_LABELS[k]).join(', ')}\n`
      }
    })
    
    message += `\n════════════════════\n`
    message += `💰 *Total:* $${totalPrice.toFixed(2)}\n`
    message += `⏰ *Time:* ${new Date().toLocaleString()}\n`
    message += `════════════════════`
    
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    })
    
    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.statusText}`)
    }
    
    const result = await response.json()
    
    return {
      success: result.ok,
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
