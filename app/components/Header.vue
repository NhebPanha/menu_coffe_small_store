<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <span class="icon">☕</span>
        <h1>Stardust <span class="highlight">Cafe</span></h1>
      </div>
      <div class="cart-icon" @click="$emit('toggle-cart')">
        🛒
        <span class="cart-badge" v-if="totalItems > 0">{{ totalItems }}</span>
      </div>
    </div>
  </header>
</template>

<script setup>
const { totalItems } = useCart()
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0,0,0,0.05);
  z-index: 100;
  padding: 1rem 0;
}
.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}
.highlight {
  color: var(--primary-color, #c48b5d);
}
.cart-icon {
  position: relative;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.3s ease;
}
.cart-icon:hover {
  background: rgba(0,0,0,0.05);
}
.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--accent-color, #ff4757);
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  height: 18px;
  min-width: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
</style>
