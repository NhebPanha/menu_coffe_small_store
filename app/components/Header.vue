<template>
  <header class="ios-nav">
    <div class="nav-content">

      <!-- QR Button -->
      <button
        class="nav-btn qr-btn"
        @click="$emit('toggle-qr')"
        title="QR Generator"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      </button>

      <!-- Cafe Title -->
      <div class="nav-title">
        <span class="nav-logo">✦</span>
        <h1>Stardust Cafe</h1>
      </div>

      <!-- Right Side Buttons -->
      <div class="nav-actions">


        <!-- Cart -->
        <button
          class="nav-btn cart-btn"
          @click="$emit('toggle-cart')"
          title="Your Order"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path
              d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
            />
          </svg>

          <span
            class="cart-badge"
            v-if="totalItems > 0"
          >
            {{ totalItems }}
          </span>
        </button>

      </div>
    </div>
  </header>
</template>

<script setup>
const { totalItems } = useCart()

// Demo notification count
const notificationCount = ref(3)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&display=swap');

.ios-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(249, 249, 249, 0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  pointer-events: none;
  white-space: nowrap;
}

.nav-logo {
  font-size: 22px;
  color: #d4a017;
}

.nav-title h1 {
  margin: 0;
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #1d1d1f;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 2px;
}

.nav-btn {
  position: relative;
  background: none;
  border: none;
  color: #007aff;
  cursor: pointer;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.nav-btn:hover {
  background: rgba(0, 122, 255, 0.08);
}

.nav-btn:active {
  transform: scale(0.92);
  background: rgba(0, 122, 255, 0.12);
}

.cart-badge,
.notification-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #ff3b30;
  color: white;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  border: 2px solid #fff;
  box-sizing: border-box;
}

.notification-btn {
  color: #ff9500;
}

.cart-btn {
  color: #007aff;
}

.qr-btn {
  color: #007aff;
}

@media (max-width: 480px) {
  .nav-content {
    padding: 10px 14px;
  }

  .nav-title h1 {
    font-size: 20px;
  }

  .nav-logo {
    font-size: 18px;
  }

  .nav-btn {
    width: 38px;
    height: 38px;
  }
}
</style>