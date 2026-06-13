<template>
  <div class="menu-card" @click="handleAdd">
    <div class="card-image-wrapper">
      <div class="promo-badge" v-if="hasPromo">-{{ discountPercent }}%</div>
      <img v-if="item.image" :src="resolveImageUrl(item.image)" :alt="item.en" class="card-image" />
      <Transition name="fade">
        <div class="added-overlay" v-if="showToast">
          <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </Transition>
    </div>

    <div class="card-info">
      <div class="card-name">{{ item.en }}</div>
      <div class="card-khmer">{{ item.kh }}</div>
      <div class="card-chinese" v-if="item.zh">{{ item.zh }}</div>

      <div class="card-footer">
        <div class="card-price-group">
          <div class="card-price">${{ item.price.toFixed(2) }}</div>
          <div class="card-old-price" v-if="hasPromo">${{ item.oldPrice.toFixed(2) }}</div>
        </div>
        <button class="add-btn" @click.stop="handleAdd">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const hasPromo = computed(() =>
  typeof props.item.oldPrice === 'number' && props.item.oldPrice > props.item.price
)
const discountPercent = computed(() =>
  hasPromo.value
    ? Math.round((1 - props.item.price / props.item.oldPrice) * 100)
    : 0
)
const { addToCart } = useCart()
const { resolveImageUrl } = useImageUrl()
const showToast = ref(false)

const handleAdd = () => {
  addToCart(props.item)
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 800)
}
</script>

<style scoped>
.menu-card {
  background: var(--ios-card, #ffffff);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}

.menu-card:active {
  transform: scale(0.96);
  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.02);
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: var(--ios-image-bg, #f2f2f7);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.menu-card:hover .card-image {
  transform: scale(1.04);
}

.added-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(48, 209, 88, 0.88);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 2;
}

.check-icon {
  animation: checkPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes checkPop {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.card-info {
  padding: 10px 12px 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--ios-label, #000);
  letter-spacing: -0.2px;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 35px;
  margin-bottom: 2px;
}

.card-khmer {
  font-size: 12px;
  color: var(--ios-secondary, #3c3c43);
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1px;
}

.card-chinese {
  font-size: 11px;
  color: var(--ios-tertiary, #8e8e93);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.promo-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 1;
  background: var(--ios-red, #ff3b30);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -0.2px;
  padding: 3px 7px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
}

.card-price-group {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.card-price {
  font-size: 15px;
  font-weight: 700;
  color: var(--ios-blue, #007aff);
}

.card-old-price {
  font-size: 12px;
  font-weight: 500;
  color: var(--ios-tertiary, #8e8e93);
  text-decoration: line-through;
}

.add-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 122, 255, 0.1);
  color: var(--ios-blue, #007aff);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, transform 0.1s;
}

.add-btn:active {
  background: rgba(0, 122, 255, 0.2);
  transform: scale(0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
