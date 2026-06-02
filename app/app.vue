<template>
  <div class="app-container">
    <Header @toggle-cart="isCartOpen = true" />
    
    <main class="main-content">
      <div class="hero">
        <h2>Welcome to Stardust Cafe</h2>
        <p>Discover our carefully crafted beverages.</p>
      </div>
      
      <div class="menu-container">
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
/* Global Styles */
:root {
  --primary-color: #c48b5d;
  --primary-hover: #a9754b;
  --accent-color: #ff4757;
  --bg-color: #fcfbf9;
  --text-dark: #2d3436;
  --text-muted: #636e72;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-dark);
  line-height: 1.6;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  width: 100%;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, rgba(196,139,93,0.1) 0%, rgba(196,139,93,0.05) 100%);
  border-radius: 24px;
}

.hero h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.hero p {
  font-size: 1.1rem;
  color: var(--text-muted);
}
</style>
