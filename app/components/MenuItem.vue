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
  height: 120px;
  overflow: hidden;
  background: #f5f5f5;
}
@media (min-width: 640px) {
  .item-image-container {
    height: 200px;
  }
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
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}
@media (min-width: 640px) {
  .item-content {
    padding: 1.25rem;
  }
}
.item-info {
  margin-bottom: 1rem;
}
.khmer {
  font-family: 'Khmer OS', 'Suwannaphum', sans-serif;
  font-size: 0.9rem;
  margin: 0 0 0.25rem 0;
  color: var(--text-dark, #2d3436);
}
@media (min-width: 640px) {
  .khmer {
    font-size: 1.1rem;
  }
}
.english, .chinese {
  font-size: 0.75rem;
  color: var(--text-muted, #636e72);
  margin: 0 0 0.1rem 0;
}
@media (min-width: 640px) {
  .english, .chinese {
    font-size: 0.9rem;
  }
}
.item-price {
  font-size: 1rem;
  font-weight: 700;
  color: var(--primary-color, #c48b5d);
  margin-top: 0.5rem;
}
@media (min-width: 640px) {
  .item-price {
    font-size: 1.25rem;
  }
}
.add-btn {
  background: var(--primary-color, #c48b5d);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  transition: background 0.2s ease, transform 0.1s ease;
}
@media (min-width: 640px) {
  .add-btn {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    gap: 0.5rem;
  }
}
.add-btn:hover {
  background: var(--primary-hover, #a9754b);
}
.add-btn:active {
  transform: scale(0.98);
}
</style>
