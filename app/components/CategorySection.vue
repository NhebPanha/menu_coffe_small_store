<template>
  <section class="category-section">
    <h2 class="section-header">{{ category.category }}</h2>
    <div class="ios-card">
      <MenuItem 
        v-for="(item, index) in category.items" 
        :key="item.id" 
        :item="item"
        :is-last="index === category.items.length - 1"
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
  margin-bottom: 24px;
}
.section-header {
  font-size: 13px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6c6c70;
  margin: 0 0 8px 20px;
}
.ios-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 0 0.5px rgba(0,0,0,0.04);
}
</style>
