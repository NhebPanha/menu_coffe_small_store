import { useState } from '#imports'

export interface CartItem {
  id: string
  kh: string
  en: string
  zh: string
  price: number
  quantity: number
}

export const useCart = () => {
  const cart = useState<CartItem[]>('cart', () => [])
  
  const addToCart = (item: any) => {
    const existing = cart.value.find(i => i.id === item.id)
    if (existing) {
      existing.quantity++
    } else {
      cart.value.push({ ...item, quantity: 1 })
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

  const clearCart = () => {
    cart.value = []
  }

  const totalItems = computed(() => cart.value.reduce((acc, item) => acc + item.quantity, 0))
  const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + (item.price * item.quantity), 0))

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice
  }
}
