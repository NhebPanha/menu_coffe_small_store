<template>
  <Transition name="notification">
    <div v-if="isVisible" class="notification-container">
      <div class="notification-card">
        <div class="notification-icon">
          <div class="checkmark-circle">
            <svg class="checkmark" viewBox="0 0 52 52">
              <circle class="checkmark-circle-outline" cx="26" cy="26" r="25" fill="none" stroke="white" stroke-width="2"/>
              <path class="checkmark-check" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
        </div>
        <div class="notification-content">
          <div class="notification-title">{{ title }}</div>
          <div class="notification-message">{{ message }}</div>
        </div>
        <div class="notification-close" @click="closeNotification">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </div>
      </div>
      <div class="notification-progress">
        <div class="progress-bar" :style="{ animation: `progress ${duration}ms linear forwards` }"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Success'
  },
  message: {
    type: String,
    default: 'Operation completed'
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const emit = defineEmits(['close'])
let timeoutId = null

const closeNotification = () => {
  emit('close')
}

watch(() => props.isVisible, (newVal) => {
  if (newVal) {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      closeNotification()
    }, props.duration)
  } else {
    if (timeoutId) clearTimeout(timeoutId)
  }
})

onMounted(() => {
  if (props.isVisible) {
    timeoutId = setTimeout(() => {
      closeNotification()
    }, props.duration)
  }
})
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  width: 90%;
  max-width: 340px;
}

.notification-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: linear-gradient(135deg, #34C759 0%, #30B14E 100%);
  border-radius: 14px;
  padding: 16px 18px;
  box-shadow: 0 20px 50px rgba(52, 199, 89, 0.4),
              0 0 1px rgba(0, 0, 0, 0.1),
              inset 0 1px 2px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
}

.notification-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  animation: shimmer 2s infinite;
}

.notification-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  position: relative;
}

.checkmark-circle {
  width: 100%;
  height: 100%;
  position: relative;
}

.checkmark {
  width: 100%;
  height: 100%;
  animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.checkmark-circle-outline {
  animation: drawCircle 0.8s ease-out forwards;
  stroke-dasharray: 157;
  stroke-dashoffset: 157;
}

.checkmark-check {
  animation: drawCheck 0.6s ease-out 0.3s forwards;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
}

.notification-content {
  flex: 1;
  color: white;
  animation: slideInText 0.5s ease-out;
}

.notification-title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 3px;
  letter-spacing: 0.4px;
}

.notification-message {
  font-size: 13px;
  opacity: 0.95;
  font-weight: 500;
}

.notification-close {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  flex-shrink: 0;
  animation: slideInClose 0.5s ease-out;
}

.notification-close:hover {
  opacity: 1;
}

.notification-close svg {
  width: 18px;
  height: 18px;
}

.notification-progress {
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0 0 14px 14px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 2px;
}

@keyframes drawCircle {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes drawCheck {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slideInText {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInClose {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-30px) scale(0.9);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-30px) scale(0.9);
}

/* For dark backgrounds */
@media (prefers-color-scheme: dark) {
  .notification-card {
    box-shadow: 0 20px 50px rgba(52, 199, 89, 0.3),
                0 0 1px rgba(0, 0, 0, 0.5);
  }
}

/* Mobile optimization */
@media (max-width: 480px) {
  .notification-card {
    padding: 14px 16px;
  }

  .notification-title {
    font-size: 14px;
  }

  .notification-message {
    font-size: 12px;
  }
}
</style>
