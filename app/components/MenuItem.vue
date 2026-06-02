<template>
  <div class="menu-row" :class="{ 'no-border': isLast }">
    <img v-if="item.image" :src="item.image" :alt="item.en" class="row-image" />
    <div class="row-info">
      <div class="row-name">{{ item.en }}</div>
      <div class="row-khmer">{{ item.kh }}</div>
      <div class="row-chinese">{{ item.zh }}</div>
      <div class="row-price">${{ item.price.toFixed(2) }}</div>
    </div>
    <button class="add-btn" @click="handleAdd">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    </button>
    <!-- Toast feedback -->
    <Transition name="toast">
      <div class="added-toast" v-if="showToast">Added ✓</div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isLast: {
    type: Boolean,
    default: false
  }
})
const { addToCart } = useCart()
const showToast = ref(false)

const handleAdd = () => {
  addToCart(props.item)
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 800)
}
</script>

<style scoped>
.menu-row {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  gap: 12px;
  border-bottom: 0.5px solid rgba(60, 60, 67, 0.12);
  position: relative;
  transition: background 0.15s;
}
.menu-row:active {
  background: rgba(0,0,0,0.02);
}
.menu-row.no-border {
  border-bottom: none;
}
.row-image {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
}
.row-info {
  flex: 1;
  min-width: 0;
}
.row-name {
  font-size: 16px;
  font-weight: 500;
  color: #000;
  letter-spacing: -0.3px;
}
.row-khmer {
  font-size: 14px;
  color: #3c3c43;
  margin-top: 1px;
  opacity: 0.7;
}
.row-chinese {
  font-size: 12px;
  color: #8e8e93;
  margin-top: 1px;
}
.row-price {
  font-size: 15px;
  font-weight: 600;
  color: #007aff;
  margin-top: 3px;
}
.add-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 122, 255, 0.1);
  color: #007aff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s, transform 0.1s;
}
.add-btn:active {
  background: rgba(0, 122, 255, 0.2);
  transform: scale(0.92);
}

/* Toast animation */
.added-toast {
  position: absolute;
  top: 50%;
  right: 60px;
  transform: translateY(-50%);
  background: #30d158;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
  pointer-events: none;
}
.toast-enter-active {
  animation: toastIn 0.2s ease;
}
.toast-leave-active {
  animation: toastOut 0.3s ease;
}
@keyframes toastIn {
  from { opacity: 0; transform: translateY(-50%) scale(0.8); }
  to { opacity: 1; transform: translateY(-50%) scale(1); }
}
@keyframes toastOut {
  from { opacity: 1; transform: translateY(-50%) scale(1); }
  to { opacity: 0; transform: translateY(-50%) scale(0.8); }
}
</style>
