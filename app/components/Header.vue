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
        <h1>Stardust Cafe</h1>
      </div>

      <!-- Right Side Buttons -->
      <div class="nav-actions">

        <!-- Dark mode toggle -->
        <button
          class="nav-btn theme-btn"
          @click="toggleTheme"
          :title="theme === 'dark' ? 'Light mode' : 'Dark mode'"
        >
          <svg v-if="theme === 'dark'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        <!-- Language toggle -->
        <button
          class="nav-btn lang-btn"
          @click="toggleLang"
          :title="lang === 'en' ? 'ប្ដូរទៅភាសាខ្មែរ' : 'Switch to English'"
        >
          {{ lang === 'en' ? 'ខ្មែរ' : 'EN' }}
        </button>

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
const { lang, toggleLang } = useLang()
const { theme, toggleTheme } = useTheme()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@600;700&display=swap');

.ios-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--ios-nav-bg, rgba(249, 249, 249, 0.88));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 0.5px solid var(--ios-separator, rgba(60, 60, 67, 0.12));
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
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  pointer-events: none;
  padding: 0 8px;
}

.nav-title h1 {
  margin: 0;
  font-family: 'Quicksand', sans-serif;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--ios-label, #1d1d1f);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}

.qr-btn {
  flex-shrink: 0;
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

.lang-btn {
  width: auto;
  min-width: 42px;
  padding: 0 10px;
  border-radius: 16px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.2px;
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
    padding: 10px 8px;
  }

  .nav-title h1 {
    font-size: 19px;
  }

  .nav-btn {
    width: 38px;
    height: 38px;
  }

  .lang-btn {
    min-width: 36px;
    padding: 0 8px;
    font-size: 13px;
  }
}

@media (max-width: 360px) {
  .nav-title h1 {
    font-size: 17px;
  }

  .nav-btn {
    width: 34px;
    height: 34px;
  }

  .nav-btn svg {
    width: 20px;
    height: 20px;
  }

  .lang-btn {
    min-width: 32px;
    padding: 0 6px;
    font-size: 12px;
  }
}
</style>