import { useState } from '#imports'

export type Lang = 'en' | 'kh'

type Entry = { en: string; kh: string }

const dict = {
  menu:             { en: 'Menu', kh: 'ម៉ឺនុយ' },
  subtitle:         { en: 'Stardust Cafe · Order & Enjoy', kh: 'Stardust Cafe · កម្ម៉ង់ និងរីករាយ' },
  yourOrder:        { en: 'Your Order', kh: 'ការកម្ម៉ង់របស់អ្នក' },
  clear:            { en: 'Clear', kh: 'សម្អាត' },
  done:             { en: 'Done', kh: 'រួចរាល់' },
  yourItems:        { en: 'Your Items', kh: 'ទំនិញរបស់អ្នក' },
  customerDetails:  { en: 'Customer Details', kh: 'ព័ត៌មានអតិថិជន' },
  namePlaceholder:  { en: 'Your Name', kh: 'ឈ្មោះរបស់អ្នក' },
  phonePlaceholder: { en: 'Phone Number', kh: 'លេខទូរស័ព្ទ' },
  phoneRequired:    { en: 'Please enter your phone number to place the order.', kh: 'សូមបញ្ចូលលេខទូរស័ព្ទរបស់អ្នកដើម្បីកម្ម៉ង់។' },
  tablePlaceholder: { en: 'Table Number (Optional)', kh: 'លេខតុ (ស្រេចចិត្ត)' },
  total:            { en: 'Total', kh: 'សរុប' },
  discount:         { en: 'Discount', kh: 'បញ្ចុះតម្លៃ' },
  save:             { en: 'Save', kh: 'សន្សំ' },
  orderWhatsapp:    { en: 'Order via WhatsApp', kh: 'កម្ម៉ង់តាម WhatsApp' },
  orderTelegram:    { en: 'Order via Telegram', kh: 'កម្ម៉ង់តាម Telegram' },
  emptyTitle:       { en: 'Your Cart is Empty', kh: 'កន្ត្រករបស់អ្នកទទេ' },
  emptySubtitle:    { en: 'Drinks you add will show up here.', kh: 'ភេសជ្ជៈដែលអ្នកបន្ថែមនឹងបង្ហាញនៅទីនេះ។' },
  sugar:            { en: 'Sugar', kh: 'ស្ករ' },
  cream:            { en: 'Cream', kh: 'ក្រ៉ីម' },
  pearls:           { en: 'Pearls', kh: 'គុជ' },
  chatTitle:        { en: 'Support', kh: 'ជំនួយ' },
  chatSubtitle:     { en: "We're here to help", kh: 'យើងនៅទីនេះដើម្បីជួយ' },
  chatPlaceholder:  { en: 'Type a message…', kh: 'វាយសារ…' },
  chatGreeting:     { en: 'Hi! 👋 How can we help you today?', kh: 'សួស្ដី! 👋 តើយើងអាចជួយអ្វីបានថ្ងៃនេះ?' },
  chatError:        { en: 'Sorry, something went wrong. Please try again.', kh: 'សុំទោស មានបញ្ហា។ សូមព្យាយាមម្ដងទៀត។' }
} satisfies Record<string, Entry>

export type TKey = keyof typeof dict

export const CATEGORY_LABELS: Record<string, Entry> = {
  'Coffee':        { en: 'Coffee', kh: 'កាហ្វេ' },
  'Matcha Series': { en: 'Matcha Series', kh: 'ម៉ាតឆា' },
  'Tea Series':    { en: 'Tea Series', kh: 'តែ' },
  'Milk Series':   { en: 'Milk Series', kh: 'ទឹកដោះគោ' },
  'Soda Series':   { en: 'Soda Series', kh: 'សូដា' },
  'Cream Series':  { en: 'Cream Series', kh: 'គ្រីម' }
}

export const useLang = () => {
  const lang = useState<Lang>('lang', () => 'en')

  const setLang = (l: Lang) => {
    lang.value = l
    if (import.meta.client) localStorage.setItem('lang', l)
  }

  const toggleLang = () => setLang(lang.value === 'en' ? 'kh' : 'en')

  const t = (key: TKey): string => dict[key]?.[lang.value] ?? String(key)

  const tCategory = (name: string): string =>
    CATEGORY_LABELS[name]?.[lang.value] ?? name

  return { lang, setLang, toggleLang, t, tCategory }
}
