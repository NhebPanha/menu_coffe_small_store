<template>
  <header class="ios-nav">
    <div class="nav-content">
      <button class="qr-btn" @click="$emit('toggle-qr')" title="QR Generator">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      </button>
      
      <div class="nav-title">
        <span class="nav-icon">☕</span>
        <h1>Stardust Cafe</h1>
      </div>
      
      <button class="cart-btn" @click="$emit('toggle-cart')" title="Your Order">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <span class="cart-badge" v-if="totalItems > 0">{{ totalItems }}</span>
      </button>
    </div>
  </header>
</template>

<script setup>
const { totalItems } = useCart()
</script>

<style scoped>
.ios-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(249, 249, 249, 0.85);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 0.5px solid rgba(60, 60, 67, 0.12);
}
.nav-content {
  max-width: 700px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.nav-title {
  display: flex;
  align-items: center;
  gap: 6px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  white-space: nowrap;
}
.nav-icon {
  font-size: 20px;
}
.nav-title h1 {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.4px;
  color: #000;
  margin: 0;
}
.qr-btn, .cart-btn {
  background: none;
  border: none;
  color: #007aff;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, transform 0.1s;
  z-index: 11;
}
.qr-btn:active, .cart-btn:active {
  background: rgba(0, 122, 255, 0.1);
  transform: scale(0.92);
}
.cart-badge {
  position: absolute;
  top: 2px;
  right: 0px;
  background: #ff3b30;
  color: white;
  font-size: 11px;
  font-weight: 700;
  height: 18px;
  min-width: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  border: 1.5px solid rgba(249, 249, 249, 1);
}
</style>
