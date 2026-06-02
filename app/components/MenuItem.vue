<template>
  <div class="menu-item">
    <div class="item-image-container" v-if="item.image">
      <img :src="item.image" :alt="item.en" class="item-image" />
    </div>
    <div class="item-content">
      <div class="item-info">
        <div class="item-langs">
          <h3 class="khmer">{{ item.kh }}</h3>
          <p class="english">{{ item.en }}</p>
          <p class="chinese">{{ item.zh }}</p>
        </div>
        <div class="item-price">${{ item.price.toFixed(2) }}</div>
      </div>
      <button class="add-btn" @click="addToCart(item)">
        <span class="icon">+</span> Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const { addToCart } = useCart()
</script>

<style scoped>
.menu-item {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(0,0,0,0.02);
}
.menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.06);
}
.item-image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f5f5f5;
}
.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.menu-item:hover .item-image {
  transform: scale(1.05);
}
.item-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}
.item-info {
  margin-bottom: 1rem;
}
.khmer {
  font-family: 'Khmer OS', 'Suwannaphum', sans-serif;
  font-size: 1.1rem;
  margin: 0 0 0.25rem 0;
  color: var(--text-dark, #2d3436);
}
.english, .chinese {
  font-size: 0.9rem;
  color: var(--text-muted, #636e72);
  margin: 0 0 0.1rem 0;
}
.item-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-color, #c48b5d);
  margin-top: 0.5rem;
}
.add-btn {
  background: var(--primary-color, #c48b5d);
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.2s ease, transform 0.1s ease;
}
.add-btn:hover {
  background: var(--primary-hover, #a9754b);
}
.add-btn:active {
  transform: scale(0.98);
}
</style>
