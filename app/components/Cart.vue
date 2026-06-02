<template>
  <div class="cart-overlay" v-if="isOpen" @click="$emit('close')"></div>
  <div class="cart-panel" :class="{ 'open': isOpen }">
    <div class="cart-header">
      <h2>Your Order</h2>
      <button class="close-btn" @click="$emit('close')">×</button>
    </div>
    
    <div class="cart-items" v-if="cart.length > 0">
      <div v-for="item in cart" :key="item.id" class="cart-item">
        <img v-if="item.image" :src="item.image" :alt="item.en" class="cart-item-image" />
        <div class="item-details">
          <div class="item-name">{{ item.en }}</div>
          <div class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</div>
        </div>
        <div class="item-actions">
          <button @click="removeFromCart(item.id)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="addToCart(item)">+</button>
        </div>
      </div>
    </div>
    
    <div class="empty-cart" v-else>
      <div class="empty-icon">☕</div>
      <p>Your cart is empty</p>
    </div>

    <div class="cart-footer" v-if="cart.length > 0">
      <div class="total-row">
        <span>Total:</span>
        <span class="total-price">${{ totalPrice.toFixed(2) }}</span>
      </div>
      <button class="checkout-btn" @click="handleCheckout">
        Order via WhatsApp
      </button>
      <button class="checkout-btn telegram-btn" @click="handleTelegramCheckout" style="margin-top: 0.5rem">
        Order via Telegram
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
const { cart, addToCart, removeFromCart, totalPrice } = useCart()

const generateOrderMessage = () => {
  let message = "Hello! I would like to place an order:\n\n";
  cart.value.forEach(item => {
    message += `- ${item.quantity}x ${item.en} (${item.kh}) - $${(item.price * item.quantity).toFixed(2)}\n`;
  })
  message += `\nTotal: $${totalPrice.value.toFixed(2)}`;
  return encodeURIComponent(message);
}

const handleCheckout = () => {
  // Replace with actual shop number
  const phoneNumber = "1234567890"; 
  const message = generateOrderMessage();
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

const handleTelegramCheckout = () => {
  // Replace with actual shop username
  const username = "shop_username"; 
  const message = generateOrderMessage();
  window.open(`https://t.me/${username}?text=${message}`, '_blank');
}
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(2px);
  z-index: 999;
}
.cart-panel {
  position: fixed;
  top: 0;
  right: -400px;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background: white;
  z-index: 1000;
  box-shadow: -5px 0 30px rgba(0,0,0,0.1);
  transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}
.cart-panel.open {
  right: 0;
}
.cart-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cart-header h2 {
  margin: 0;
  font-size: 1.5rem;
}
.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--text-muted, #636e72);
  line-height: 1;
}
.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px dashed rgba(0,0,0,0.1);
  gap: 1rem;
}
.cart-item-image {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
}
.item-details {
  flex: 1;
}
.item-name {
  font-weight: 600;
}
.item-price {
  color: var(--primary-color, #c48b5d);
  font-weight: 700;
}
.item-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.item-actions button {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.item-actions button:hover {
  background: #f5f5f5;
}
.empty-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-muted, #636e72);
}
.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}
.cart-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(0,0,0,0.05);
  background: #fafafa;
}
.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
}
.total-price {
  color: var(--primary-color, #c48b5d);
}
.checkout-btn {
  width: 100%;
  padding: 1rem;
  background: #25D366; /* WhatsApp color */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.checkout-btn:hover {
  opacity: 0.9;
}
.telegram-btn {
  background: #0088cc; /* Telegram color */
}
</style>
