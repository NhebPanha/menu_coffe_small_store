import { useState } from '#imports'

export interface Toppings {
  cream: boolean
  pearls: boolean
}

export interface CartItem {
  id: string
  kh: string
  en: string
  zh: string
  price: number
  oldPrice?: number
  quantity: number
  image?: string
  toppings: Toppings
  sugar: number
}

export const TOPPING_PRICE = 0.25

export const SUGAR_LEVELS = [25, 50, 75, 100]
export const DEFAULT_SUGAR = 100

export const TOPPING_LABELS: Record<keyof Toppings, string> = {
  cream: 'Cream',
  pearls: 'Pearls'
}

// active topping keys for a cart item
export const activeToppings = (item: CartItem): (keyof Toppings)[] =>
  (Object.keys(TOPPING_LABELS) as (keyof Toppings)[]).filter(k => item.toppings?.[k])

// price of a single unit including its toppings
export const unitPrice = (item: CartItem): number =>
  item.price + activeToppings(item).length * TOPPING_PRICE

// price of the whole line (unit price × quantity)
export const lineTotal = (item: CartItem): number => unitPrice(item) * item.quantity

// whether this item is on promotion
export const hasDiscount = (item: CartItem): boolean =>
  typeof item.oldPrice === 'number' && item.oldPrice > item.price

// per-unit money saved by the promotion (0 if not on promo)
export const unitDiscount = (item: CartItem): number =>
  hasDiscount(item) ? (item.oldPrice as number) - item.price : 0

// money saved across the whole line (per-unit saving × quantity)
export const lineDiscount = (item: CartItem): number => unitDiscount(item) * item.quantity

export const useCart = () => {
  const cart = useState<CartItem[]>('cart', () => [])
  const tableNumber = useState<string>('tableNumber', () => '')

  const addToCart = (item: any) => {
    const existing = cart.value.find(i => i.id === item.id)
    if (existing) {
      existing.quantity++
    } else {
      cart.value.push({
        ...item,
        quantity: 1,
        toppings: item.toppings ?? { cream: false, pearls: false },
        sugar: item.sugar ?? DEFAULT_SUGAR
      })
    }
  }

  const removeFromCart = (id: string) => {
    const index = cart.value.findIndex(i => i.id === id)
    if (index > -1) {
      if (cart.value[index].quantity > 1) {
        cart.value[index].quantity--
      } else {
        cart.value.splice(index, 1)
      }
    }
  }

  const toggleTopping = (id: string, name: keyof Toppings) => {
    const item = cart.value.find(i => i.id === id)
    if (!item) return
    if (!item.toppings) item.toppings = { cream: false, pearls: false }
    item.toppings[name] = !item.toppings[name]
  }

  const setSugar = (id: string, level: number) => {
    const item = cart.value.find(i => i.id === id)
    if (item) item.sugar = level
  }

  const clearCart = () => {
    cart.value = []
  }

  const totalItems = computed(() => cart.value.reduce((acc, item) => acc + item.quantity, 0))
  const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + lineTotal(item), 0))
  // total money saved by promotions across the whole cart
  const totalDiscount = computed(() => cart.value.reduce((acc, item) => acc + lineDiscount(item), 0))

  return {
    cart,
    tableNumber,
    addToCart,
    removeFromCart,
    toggleTopping,
    setSugar,
    clearCart,
    totalItems,
    totalPrice,
    totalDiscount
  }
}
