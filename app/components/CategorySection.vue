<template>
  <section class="category-section">
    <h2 class="category-title">{{ category.category }}</h2>
    <div class="items-grid">
      <MenuItem 
        v-for="item in category.items" 
        :key="item.id" 
        :item="item" 
      />
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.category-section {
  margin-bottom: 3rem;
}
.category-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-dark, #2d3436);
  position: relative;
  display: inline-block;
}
.category-title::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 40px;
  height: 3px;
  background: var(--primary-color, #c48b5d);
  border-radius: 2px;
}
.items-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
@media (min-width: 640px) {
  .items-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }
}
</style>
