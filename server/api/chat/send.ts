import { menuData } from '../../../app/data/menu'

type Lang = 'en' | 'kh'

type Product = {
  en: string
  kh: string
  zh?: string
  price: number
  category: string
}

// Flatten the project's menu into a single searchable list (deduped by name)
const PRODUCTS: Product[] = (() => {
  const seen = new Set<string>()
  const list: Product[] = []
  for (const cat of menuData) {
    for (const item of cat.items) {
      const key = item.en.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      list.push({
        en: item.en,
        kh: item.kh,
        zh: (item as any).zh,
        price: item.price,
        category: cat.category
      })
    }
  }
  return list
})()

// Khmer label for each category (falls back to English name)
const CATEGORY_KH: Record<string, string> = {
  'Coffee': 'កាហ្វេ',
  'Matcha Series': 'ម៉ាតឆា',
  'Tea Series': 'តែ',
  'Milk Series': 'ទឹកដោះគោ',
  'Soda Series': 'សូដា',
  'Cream Series': 'គ្រីម'
}
const catLabel = (c: string, lang: Lang) => (lang === 'kh' ? CATEGORY_KH[c] ?? c : c)

const money = (n: number) => `$${n.toFixed(2)}`

// Khmer first when in Khmer mode, English first otherwise
const formatProduct = (p: Product, lang: Lang) =>
  lang === 'kh'
    ? `• ${p.kh} (${p.en}) — ${money(p.price)}`
    : `• ${p.en} (${p.kh})${p.zh ? ` ${p.zh}` : ''} — ${money(p.price)}`

const hasKhmer = (text: string) => /[ក-៿]/.test(text)

const findProducts = (text: string): Product[] => {
  const l = text.toLowerCase()
  return PRODUCTS.filter(
    p =>
      l.includes(p.en.toLowerCase()) ||
      (p.kh && text.includes(p.kh)) ||
      (p.zh && text.includes(p.zh))
  )
}

const findCategory = (text: string): string | null => {
  const l = text.toLowerCase()
  const categories = [...new Set(menuData.map(c => c.category))]
  for (const c of categories) {
    const head = c.toLowerCase().replace(/ series$/, '')
    const kh = CATEGORY_KH[c]
    if (l.includes(head) || (kh && text.includes(kh))) return c
  }
  return null
}

const listCategory = (category: string, lang: Lang): string => {
  const items = PRODUCTS.filter(p => p.category === category)
  return `${catLabel(category, lang)}:\n${items.map(p => formatProduct(p, lang)).join('\n')}`
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const msg = String(body?.message ?? '').trim()
    const l = msg.toLowerCase()

    // Reply in Khmer if the app is set to Khmer OR the message contains Khmer text
    const lang: Lang = body?.lang === 'kh' || hasKhmer(msg) ? 'kh' : 'en'
    const categories = [...new Set(menuData.map(c => c.category))]
    let reply = ''

    if (!msg) {
      reply =
        lang === 'kh'
          ? 'សួស្ដី! ខ្ញុំជាជំនួយការ Stardust Cafe — សួរអំពីភេសជ្ជៈ តម្លៃ ឬម៉ឺនុយបាន។'
          : "Hi! I'm your Stardust Cafe assistant — ask me about any drink, its price, or our menu."
    } else if (/\b(hi|hello|hey)\b/.test(l) || msg.includes('សួស្ដី')) {
      reply =
        lang === 'kh'
          ? 'សួស្ដី! 👋 ខ្ញុំអាចជួយរកភេសជ្ជៈ និងតម្លៃ។ សាកសួរ "ម៉ឺនុយ", "ម៉ាតឆា" ឬ "តម្លៃ អាយឡាតេ"។'
          : 'Hello! 👋 I can help you find a drink and its price. Try "show menu", "matcha", or "how much is Iced Latte?"'
    } else {
      // 1) Specific product mention → name + price (+ category)
      const matched = findProducts(msg)
      const only = matched[0]
      if (matched.length === 1 && only) {
        reply =
          lang === 'kh'
            ? `${only.kh} (${only.en}) តម្លៃ ${money(only.price)} — ស្ថិតក្នុង ${catLabel(only.category, 'kh')}។`
            : `${only.en} (${only.kh})${only.zh ? ` ${only.zh}` : ''} is ${money(only.price)} — from our ${only.category}.`
      } else if (matched.length > 1) {
        reply =
          (lang === 'kh' ? 'នេះជាអ្វីដែលរកឃើញ៖\n' : "Here's what I found:\n") +
          matched.map(p => formatProduct(p, lang)).join('\n')
      } else {
        // 2) Category mention → list that category
        const cat = findCategory(msg)
        if (cat) {
          reply = listCategory(cat, lang)
        } else if (/\b(menu|list|all|drinks?|show)\b/.test(l) || msg.includes('ម៉ឺនុយ')) {
          // 3) Full menu request → categories overview
          reply =
            lang === 'kh'
              ? `យើងមាន ${categories.length} ប្រភេទ៖\n` +
                categories.map(c => `• ${catLabel(c, 'kh')}`).join('\n') +
                `\n\nសួរប្រភេទណាមួយ (ឧ. "កាហ្វេ") ដើម្បីមើលភេសជ្ជៈ និងតម្លៃ។`
              : `We have ${categories.length} categories:\n` +
                categories.map(c => `• ${c}`).join('\n') +
                `\n\nAsk for any of them (e.g. "Coffee") to see drinks and prices.`
        } else if (/\b(cheap|cheapest|lowest|affordable)\b/.test(l) || msg.includes('ថោក')) {
          const cheapest = [...PRODUCTS].sort((a, b) => a.price - b.price).slice(0, 3)
          reply =
            (lang === 'kh' ? 'ភេសជ្ជៈតម្លៃសមរម្យបំផុត៖\n' : 'Our most affordable drinks:\n') +
            cheapest.map(p => formatProduct(p, lang)).join('\n')
        } else if (/\b(recommend|suggest|popular|best|favou?rite)\b/.test(l) || msg.includes('ណែនាំ')) {
          const picks = ['Iced Latte', 'Matcha Latte', 'Brown Sugar Milk Tea']
          const recs = PRODUCTS.filter(p => picks.includes(p.en))
          reply =
            (lang === 'kh' ? 'ភេសជ្ជៈពេញនិយម 😋\n' : 'Popular picks 😋\n') +
            recs.map(p => formatProduct(p, lang)).join('\n')
        } else if (/\b(price|cost|how much)\b/.test(l) || l.includes('$') || msg.includes('តម្លៃ')) {
          reply =
            lang === 'kh'
              ? 'ប្រាប់ខ្ញុំពីភេសជ្ជៈណាមួយ (ឧ. "អាយឡាតេ") ខ្ញុំនឹងប្រាប់តម្លៃ។ ឬនិយាយ "ម៉ឺនុយ" ដើម្បីមើល។'
              : 'Tell me which drink you mean (e.g. "Iced Coffee") and I\'ll give you the price. Or say "menu" to browse.'
        } else if (/\b(thank|thanks|ok|okay)\b/.test(l) || msg.includes('អរគុណ')) {
          reply =
            lang === 'kh'
              ? 'មិនអីទេ! ☕ មានអ្វីផ្សេងទៀតដែលខ្ញុំអាចជួយបានទេ?'
              : "You're welcome! ☕ Anything else I can help with?"
        } else {
          reply =
            lang === 'kh'
              ? `សុំទោស រកមិនឃើញ "${msg}" ក្នុងម៉ឺនុយ។ សាកឈ្មោះភេសជ្ជៈ "អាយឡាតេ" ប្រភេទ "ម៉ាតឆា" ឬនិយាយ "ម៉ឺនុយ"។`
              : `Sorry, I couldn't find "${msg}" on the menu. Try a drink name like "Iced Latte", a category like "Matcha", or say "menu" to see everything.`
        }
      }
    }

    return { success: true, reply }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
})
