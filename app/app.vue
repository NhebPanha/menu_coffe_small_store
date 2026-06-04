<template>
  <div class="ios-app">
    <!-- Animated background -->
    <div class="animated-bg" aria-hidden="true">
      <span class="blob blob-1"></span>
      <span class="blob blob-2"></span>
      <span class="blob blob-3"></span>
      <span class="blob blob-4"></span>
      <span class="blob blob-5"></span>
    </div>

    <Header @toggle-cart="isCartOpen = true" @toggle-qr="isQrOpen = true" />
    
    <main class="ios-content">
      <!-- Large title -->
      <div class="large-title-section">
        <h1 class="large-title">{{ t('menu') }}</h1>
        <p class="large-subtitle">{{ t('subtitle') }}</p>
      </div>
      
      <!-- Menu categories -->
      <div class="menu-list">
        <CategorySection 
          v-for="category in menuData" 
          :key="category.category" 
          :category="category" 
        />
      </div>
    </main>
    
    <Cart :is-open="isCartOpen" @close="isCartOpen = false" />
    <QrGenerator :is-open="isQrOpen" @close="isQrOpen = false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from '#imports'
import { menuData } from '~/data/menu'

const isCartOpen = ref(false)
const isQrOpen = ref(false)

const route = useRoute()
const { tableNumber } = useCart()
const { t, setLang } = useLang()
const { initTheme } = useTheme()

// Apply saved/system theme before first paint to avoid a flash
useHead({
  script: [{
    innerHTML: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`
  }]
})

onMounted(() => {
  if (route.query.table) {
    tableNumber.value = String(route.query.table)
  }
  const saved = localStorage.getItem('lang')
  if (saved === 'en' || saved === 'kh') {
    setLang(saved)
  }
  initTheme()
})
</script>

<style>
/* ── iOS Global Reset ── */
:root {
  --ios-blue: #007aff;
  --ios-green: #30d158;
  --ios-red: #ff3b30;
  --ios-bg: #f2f2f7;
  --ios-card: #ffffff;
  --ios-separator: rgba(60, 60, 67, 0.12);
  --ios-label: #000000;
  --ios-secondary: #3c3c43;
  --ios-tertiary: #8e8e93;
  --ios-nav-bg: rgba(249, 249, 249, 0.88);
  --ios-image-bg: #f2f2f7;
}

html.dark {
  --ios-blue: #0a84ff;
  --ios-green: #30d158;
  --ios-red: #ff453a;
  --ios-bg: #000000;
  --ios-card: #1c1c1e;
  --ios-separator: rgba(84, 84, 88, 0.55);
  --ios-label: #ffffff;
  --ios-secondary: #ebebf5;
  --ios-tertiary: #8e8e93;
  --ios-nav-bg: rgba(28, 28, 30, 0.8);
  --ios-image-bg: #2c2c2e;
}

html, body {
  transition: background-color 0.3s ease, color 0.3s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Segoe UI', Roboto, sans-serif;
  background-color: var(--ios-bg);
  color: var(--ios-label);
  line-height: 1.47;
  letter-spacing: -0.2px;
}

/* ── App Container ── */
.ios-app {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* ── Animated Background ── */
.animated-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(-45deg, #fde7f0, #e7f0fd, #fdf3e0, #e9fbef, #f3e9fd);
  background-size: 400% 400%;
  animation: bgShift 22s ease infinite;
}

@keyframes bgShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(42px);
  opacity: 0.55;
  will-change: transform;
}

.blob-1 {
  width: 320px; height: 320px;
  left: -80px; top: 8%;
  background: #ff9ec4;
  animation: float1 18s ease-in-out infinite;
}
.blob-2 {
  width: 260px; height: 260px;
  right: -60px; top: 22%;
  background: #8fd0ff;
  animation: float2 21s ease-in-out infinite;
}
.blob-3 {
  width: 300px; height: 300px;
  left: 18%; bottom: 4%;
  background: #ffd58f;
  animation: float3 24s ease-in-out infinite;
}
.blob-4 {
  width: 220px; height: 220px;
  right: 12%; bottom: 14%;
  background: #a8f0c2;
  animation: float1 20s ease-in-out infinite reverse;
}
.blob-5 {
  width: 200px; height: 200px;
  left: 40%; top: 40%;
  background: #cdb4ff;
  animation: float2 26s ease-in-out infinite;
}

@keyframes float1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(40px, -50px) scale(1.12); }
}
@keyframes float2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(-50px, 40px) scale(1.1); }
}
@keyframes float3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(30px, -40px) scale(0.9); }
}

html.dark .animated-bg {
  background: linear-gradient(-45deg, #2a1430, #121d33, #2e2412, #0f2719, #201233);
}
html.dark .blob {
  opacity: 0.32;
}

@media (prefers-reduced-motion: reduce) {
  .animated-bg { animation: none; }
  .blob { animation: none; }
}

/* ── Content ── */
.ios-content {
  flex: 1;
  max-width: 700px;
  margin: 0 auto;
  padding: 0 0 40px 0;
  width: 100%;
}

/* ── Large Title (iOS style) ── */
.large-title-section {
  padding: 8px 20px 16px;
}
.large-title {
  font-size: 34px;
  font-weight: 700;
  letter-spacing: 0.37px;
  color: var(--ios-label);
  margin: 0;
}
.large-subtitle {
  font-size: 15px;
  color: var(--ios-tertiary);
  margin: 2px 0 0 0;
  letter-spacing: -0.24px;
}

/* ── Menu List ── */
.menu-list {
  padding: 0 16px;
}
</style>
