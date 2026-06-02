<template>
  <div class="ios-app">
    <Header @toggle-cart="isCartOpen = true" />
    
    <main class="ios-content">
      <!-- Large title -->
      <div class="large-title-section">
        <h1 class="large-title">Menu</h1>
        <p class="large-subtitle">Stardust Cafe · Order & Enjoy</p>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { menuData } from '~/data/menu'

const isCartOpen = ref(false)
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
  color: #000;
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
