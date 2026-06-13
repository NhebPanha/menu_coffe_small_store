<template>
  <section class="category-section">
    <h2 class="section-header">{{ tCategory(category.category) }}</h2>
    <div class="ios-grid-container">
      <MenuItem v-for="item in category.items" :key="item.id" :item="item" />
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
const { tCategory } = useLang()
</script>

<style scoped>
.category-section {
  margin-bottom: 24px;
}

.section-header {
  font-size: 13px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--ios-tertiary, #6c6c70);
  margin: 0 0 8px 4px;
}

.ios-grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

@media (min-width: 520px) {
  .ios-grid-container {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}
</style>
