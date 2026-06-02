<template>
  <Transition name="fade">
    <div class="cart-overlay" v-if="isOpen" @click="$emit('close')"></div>
  </Transition>
  
  <div class="cart-panel" :class="{ 'open': isOpen }">
    <div class="cart-header">
      <button class="nav-text-btn clear-all-btn" v-if="cart.length > 0" @click="clearCart">Clear</button>
      <div class="nav-btn-placeholder" v-else></div>
      
      <h2 class="nav-title">Your Order</h2>
      
      <button class="nav-text-btn close-btn" @click="$emit('close')">Done</button>
    </div>
    
    <div class="cart-content">
      <div class="cart-scroll-area" v-if="cart.length > 0">
        <div class="ios-section-header">Your Items</div>
        <div class="ios-grouped-card">
          <div v-for="(item, index) in cart" :key="item.id" class="cart-row" :class="{ 'no-border': index === cart.length - 1 }">
            <img v-if="item.image" :src="item.image" :alt="item.en" class="row-image" />
            <div class="row-details">
              <div class="row-name">{{ item.en }}</div>
              <div class="row-secondary-langs">
                <span>{{ item.kh }}</span>
                <span v-if="item.zh" class="zh-divider">·</span>
                <span v-if="item.zh" class="row-zh">{{ item.zh }}</span>
              </div>
              <div class="row-price">${{ (item.price * item.quantity).toFixed(2) }}</div>
            </div>
            <div class="row-actions">
              <div class="ios-stepper">
                <button class="stepper-btn minus" @click="removeFromCart(item.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
                <span class="stepper-val">{{ item.quantity }}</span>
                <button class="stepper-btn plus" @click="addToCart(item)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="ios-section-header">Customer Details</div>
        <div class="ios-grouped-card">
          <div class="input-row">
            <span class="input-icon">👤</span>
            <input 
              v-model="customerName" 
              type="text" 
              class="customer-name-input" 
              placeholder="Your Name / ឈ្មោះ" 
            />
          </div>
        </div>
      </div>
      
      <div class="empty-cart" v-else>
        <div class="empty-illustration">🥤</div>
        <h3 class="empty-title">Your Cart is Empty</h3>
        <p class="empty-subtitle">Drinks you add will show up here.</p>
      </div>
    </div>

    <div class="cart-footer" v-if="cart.length > 0">
      <div class="total-row">
        <span class="total-label">Total</span>
        <span class="total-price">${{ totalPrice.toFixed(2) }}</span>
      </div>
      
      <div class="checkout-actions">
        <button class="ios-btn wa-btn" @click="handleCheckout">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.793 1.451 5.485 0 9.948-4.469 9.952-9.96.002-2.66-1.023-5.158-2.887-7.027A9.857 9.857 0 0 0 11.999 1.45c-5.49 0-9.953 4.471-9.957 9.963 0 1.9.497 3.753 1.442 5.358l-.995 3.633 3.558-.934zM18.23 15.22c-.34-.17-2.012-.993-2.321-1.105-.31-.113-.536-.17-.76.17-.225.34-.87 1.102-1.066 1.328-.197.226-.394.254-.734.084-.34-.17-1.437-.53-2.738-1.691-1.012-.903-1.696-2.02-1.894-2.36-.197-.34-.02-.524.15-.694.153-.153.34-.396.51-.594.17-.198.226-.34.34-.565.113-.226.056-.424-.028-.593-.085-.17-.76-1.834-1.042-2.513-.275-.662-.555-.572-.76-.583-.197-.01-.423-.01-.648-.01-.225 0-.592.085-.902.424-.31.34-1.183 1.158-1.183 2.825 0 1.667 1.212 3.277 1.382 3.503.17.226 2.385 3.642 5.776 5.102.806.347 1.436.554 1.928.71.81.258 1.547.222 2.13.135.65-.098 2.013-.82 2.295-1.58.28-.762.28-1.413.197-1.55-.084-.136-.31-.22-.65-.39z"/>
          </svg>
          Order via WhatsApp
        </button>
        
        <button class="ios-btn tg-btn" @click="handleTelegramCheckout">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0C5.357 0 0 5.357 0 12s5.357 12 12 12 12-5.357 12-12S18.527 0 11.944 0zm5.636 8.324l-1.922 9.062c-.143.64-.523.796-1.057.496l-2.929-2.158-1.413 1.36c-.156.156-.287.287-.588.287l.21-2.98 5.426-4.9c.235-.21-.051-.326-.366-.117L9.22 13.916l-2.89-.903c-.628-.196-.64-.628.13-.928l11.295-4.354c.523-.19.98.12.825.593z"/>
          </svg>
          Order via Telegram
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
const { cart, addToCart, removeFromCart, totalPrice, clearCart } = useCart()
const customerName = ref('')

const generateOrderMessage = () => {
  const name = customerName.value.trim() || 'Customer'
  let message = `════════════════════\n`
  message += `🧾 ORDER: ${name}\n`
  message += `════════════════════\n\n`
  
  cart.value.forEach((item, index) => {
    message += `🥤 Name : ${item.en} (${item.kh})\n`
    message += `📦 Qty  : ${item.quantity}\n`
    message += `💵 Price: $${(item.price * item.quantity).toFixed(2)}\n`
    if (index < cart.value.length - 1) {
      message += `\n────────────────────\n\n`
    }
  })
  
  message += `\n════════════════════\n`
  message += `💰 Total: $${totalPrice.value.toFixed(2)}\n`
  message += `════════════════════`
  
  return encodeURIComponent(message)
}

const handleCheckout = () => {
  const phoneNumber = "1234567890" 
  const message = generateOrderMessage()
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  clearCart()
  emit('close')
}

const handleTelegramCheckout = () => {
  const username = "jiaowobaobao" 
  const message = generateOrderMessage()
  window.open(`https://t.me/${username}?text=${message}`, '_blank')
  clearCart()
  emit('close')
}
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 999;
}

.cart-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 390px;
  height: 100vh;
  background: var(--ios-bg, #f2f2f7);
  z-index: 1000;
  box-shadow: -10px 0 30px rgba(0,0,0,0.12);
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  display: flex;
  flex-direction: column;
}

.cart-panel.open {
  transform: translateX(0);
}

@media (min-width: 480px) {
  .cart-panel {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    overflow: hidden;
  }
}

.cart-header {
  height: 52px;
  background: rgba(249, 249, 249, 0.85);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 0.5px solid var(--ios-separator, rgba(60, 60, 67, 0.12));
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  position: relative;
  z-index: 10;
}

.nav-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.4px;
  color: #000;
  pointer-events: none;
  white-space: nowrap;
}

.nav-text-btn {
  background: none;
  border: none;
  font-family: inherit;
  font-size: 16px;
  font-weight: 400;
  color: var(--ios-blue, #007aff);
  cursor: pointer;
  padding: 8px 12px;
  transition: opacity 0.15s;
  z-index: 11;
}

.nav-text-btn:active {
  opacity: 0.4;
}

.nav-text-btn.close-btn {
  font-weight: 600;
}

.nav-text-btn.clear-all-btn {
  color: var(--ios-red, #ff3b30);
}

.nav-btn-placeholder {
  width: 56px;
  height: 20px;
}

.cart-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cart-scroll-area {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0 24px;
  -webkit-overflow-scrolling: touch;
}

.ios-section-header {
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #6c6c70;
  margin: 18px 32px 8px;
}

.ios-grouped-card {
  background: var(--ios-card, #ffffff);
  border-radius: 10px;
  margin: 0 16px 16px;
  overflow: hidden;
  box-shadow: 0 0 0 0.5px rgba(0,0,0,0.04);
}

.cart-row {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
  border-bottom: 0.5px solid var(--ios-separator, rgba(60, 60, 67, 0.12));
}

.cart-row.no-border {
  border-bottom: none;
}

.row-image {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.row-details {
  flex: 1;
  min-width: 0;
}

.row-name {
  font-size: 15px;
  font-weight: 600;
  color: #000;
  letter-spacing: -0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row-secondary-langs {
  font-size: 13px;
  color: var(--ios-secondary, #3c3c43);
  opacity: 0.65;
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
}

.zh-divider {
  margin: 0 4px;
}

.row-zh {
  font-size: 12px;
}

.row-price {
  font-size: 14px;
  font-weight: 600;
  color: var(--ios-blue, #007aff);
  margin-top: 3px;
}

.row-actions {
  flex-shrink: 0;
}

.ios-stepper {
  display: flex;
  align-items: center;
  background: rgba(120, 120, 128, 0.12);
  border-radius: 8px;
  height: 28px;
  overflow: hidden;
  padding: 2px;
}

.stepper-btn {
  background: none;
  border: none;
  width: 28px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ios-blue, #007aff);
  cursor: pointer;
  transition: background-color 0.15s, opacity 0.15s;
}

.stepper-btn:active {
  background-color: rgba(120, 120, 128, 0.15);
  opacity: 0.7;
}

.stepper-val {
  font-size: 14px;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
  color: #000;
  user-select: none;
}

.input-row {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  gap: 12px;
}

.input-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.customer-name-input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 16px;
  color: #000;
  outline: none;
  padding: 4px 0;
}

.customer-name-input::placeholder {
  color: var(--ios-tertiary, #8e8e93);
}

.empty-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
}

.empty-illustration {
  font-size: 64px;
  margin-bottom: 16px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.06));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: #000;
  margin-bottom: 6px;
}

.empty-subtitle {
  font-size: 14px;
  color: var(--ios-tertiary, #8e8e93);
  max-width: 220px;
}

.cart-footer {
  padding: 16px 16px calc(16px + env(safe-area-inset-bottom, 12px));
  background: rgba(249, 249, 249, 0.85);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-top: 0.5px solid var(--ios-separator, rgba(60, 60, 67, 0.12));
  position: relative;
  z-index: 10;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.total-label {
  font-size: 17px;
  font-weight: 500;
  color: #000;
}

.total-price {
  font-size: 22px;
  font-weight: 700;
  color: #000;
  letter-spacing: -0.4px;
}

.checkout-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ios-btn {
  width: 100%;
  height: 50px;
  border-radius: 12px;
  border: none;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.1s ease, opacity 0.15s ease;
}

.ios-btn:active {
  transform: scale(0.97);
  opacity: 0.9;
}

.wa-btn {
  background: var(--ios-green, #30d158);
}

.tg-btn {
  background: var(--ios-blue, #007aff);
}

.btn-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
