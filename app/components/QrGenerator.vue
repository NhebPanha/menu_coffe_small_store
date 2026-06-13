<template>
  <Transition name="fade">
    <div class="modal-overlay" v-if="isOpen" @click="$emit('close')"></div>
  </Transition>
  
  <div class="modal-panel" :class="{ 'open': isOpen }">
    <div class="modal-header">
      <h2 class="nav-title">QR Generator</h2>
      <button class="nav-text-btn close-btn" @click="$emit('close')">Done</button>
    </div>
    
    <div class="modal-content">
      <div class="scroll-area">
        <p class="description">
          Generate custom QR codes for your tables. Print them out so customers can scan to instantly open the menu with their table number pre-selected.
        </p>
        
        <!-- Live QR Code Card Preview -->
        <div class="qr-preview-card" id="qr-card-to-print">
          <div class="card-branding">
            <span class="brand-logo">☕</span>
            <h3 class="brand-name">Stardust Cafe</h3>
            <p class="brand-sub">Scan to Order</p>
          </div>
          
          <div class="qr-container">
            <img :src="qrImageUrl" alt="QR Code" class="qr-image" />
          </div>
          
          <div class="card-table-badge" v-if="tableVal">
            TABLE {{ tableVal }}
          </div>
          <div class="card-table-badge placeholder" v-else>
            MAIN MENU
          </div>
        </div>
        
        <!-- Controls -->
        <div class="ios-section-header">Configurations</div>
        <div class="ios-grouped-card">
          <div class="input-row">
            <span class="input-icon">🪑</span>
            <input 
              v-model="tableVal" 
              type="text" 
              class="ios-input" 
              placeholder="Table Number (e.g. 5, A1)" 
            />
          </div>
          <div class="url-display-row">
            <span class="url-label">Redirect Link:</span>
            <span class="url-text">{{ fullUrl }}</span>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="action-buttons">
          <button class="ios-action-btn print-btn" @click="handlePrint">
            🖨️ Print Table Tent
          </button>
          <button class="ios-action-btn copy-btn" @click="handleCopy">
            {{ copyStatus }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const tableVal = ref('')
const baseUrl = 'https://stardustcafe.vercel.app/menu_coffe_small_store/'
const copyStatus = ref('🔗 Copy Table Link')

const fullUrl = computed(() => {
  const table = tableVal.value.trim()
  return table ? `${baseUrl}?table=${encodeURIComponent(table)}` : baseUrl
})

const qrImageUrl = computed(() => {
  if (!fullUrl.value) return ''
  // Generate high quality QR code using free qrserver api
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(fullUrl.value)}&margin=10`
})

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(fullUrl.value)
    copyStatus.value = '✓ Copied!'
    setTimeout(() => {
      copyStatus.value = '🔗 Copy Table Link'
    }, 2000)
  } catch (err) {
    copyStatus.value = 'Failed to copy'
  }
}

const handlePrint = () => {
  const printWindow = window.open('', '_blank')
  if (!printWindow) return
  
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(fullUrl.value)}&margin=10`
  const tableText = tableVal.value.trim() ? `TABLE ${tableVal.value.trim()}` : 'SCAN TO ORDER'
  
  printWindow.document.write(`
    <html>
      <head>
        <title>Print QR Code - Stardust Cafe</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Segoe UI", Roboto, sans-serif;
            text-align: center;
            padding: 40px;
            margin: 0;
            background: #fff;
          }
          .card {
            border: 2px dashed #007aff;
            border-radius: 24px;
            padding: 48px 32px;
            max-width: 380px;
            margin: 40px auto;
            box-shadow: 0 8px 24px rgba(0,0,0,0.06);
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .cafe-logo {
            font-size: 40px;
            margin-bottom: 8px;
          }
          .cafe-name {
            font-size: 26px;
            font-weight: 700;
            margin: 0 0 4px;
            letter-spacing: -0.5px;
            color: #000;
          }
          .tagline {
            font-size: 14px;
            color: #8e8e93;
            margin: 0 0 32px;
            font-weight: 500;
          }
          .qr-container {
            padding: 16px;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            margin-bottom: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .qr-img {
            width: 240px;
            height: 240px;
            display: block;
          }
          .table-num {
            font-size: 38px;
            font-weight: 800;
            letter-spacing: 1px;
            margin: 0 0 16px;
            color: #000;
          }
          .instructions {
            font-size: 15px;
            color: #3c3c43;
            margin: 0;
            font-weight: 600;
            background: #f2f2f7;
            padding: 8px 16px;
            border-radius: 20px;
          }
          @media print {
            body { padding: 0; }
            .card {
              border: none;
              box-shadow: none;
              margin: 0 auto;
            }
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="cafe-logo">☕</div>
          <h1 class="cafe-name">stardustcafebotust Cafe</h1>
          <p class="tagline">Scan to View Menu & Order</p>
          <div class="qr-container">
            <img class="qr-img" src="${qrUrl}" alt="QR Code" />
          </div>
          <h2 class="table-num">${tableText}</h2>
          <p class="instructions">📱 Order via WhatsApp / Telegram</p>
        </div>
        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() { window.close(); }, 500);
          }
        <\/script>
      </body>
    </html>
  `)
  printWindow.document.close()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 999;
}

.modal-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 390px;
  height: 100vh;
  background: var(--ios-bg, #f2f2f7);
  z-index: 1000;
  box-shadow: 10px 0 30px rgba(0,0,0,0.12);
  transform: translateX(-100%);
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
              background-color 0.3s ease;
  display: flex;
  flex-direction: column;
}

.modal-panel.open {
  transform: translateX(0);
}

@media (min-width: 480px) {
  .modal-panel {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    overflow: hidden;
  }
}

.modal-header {
  height: 52px;
  background: var(--ios-nav-bg, rgba(249, 249, 249, 0.85));
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 0.5px solid var(--ios-separator, rgba(60, 60, 67, 0.12));
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
  position: relative;
  z-index: 10;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.nav-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.4px;
  color: var(--ios-label, #000);
  pointer-events: none;
  white-space: nowrap;
  transition: color 0.3s ease;
}

.nav-text-btn {
  background: none;
  border: none;
  font-family: inherit;
  font-size: 16px;
  font-weight: 400;
  color: var(--ios-blue, #007aff);
  cursor: pointer;
  padding: 8px 12px;
  transition: opacity 0.15s;
  z-index: 11;
}

.nav-text-btn:active {
  opacity: 0.4;
}

.nav-text-btn.close-btn {
  font-weight: 600;
}

.modal-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.scroll-area {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  -webkit-overflow-scrolling: touch;
}

.description {
  font-size: 13px;
  line-height: 1.4;
  color: var(--ios-secondary, #3c3c43);
  margin-bottom: 20px;
  padding: 0 8px;
  text-align: center;
}

.qr-preview-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 32px 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  border: 0.5px solid var(--ios-separator, rgba(60, 60, 67, 0.12));
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}

.card-branding {
  text-align: center;
  margin-bottom: 20px;
}

.brand-logo {
  font-size: 32px;
  display: block;
  margin-bottom: 4px;
}

.brand-name {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.4px;
}

.brand-sub {
  font-size: 12px;
  color: var(--ios-tertiary, #8e8e93);
  margin: 2px 0 0;
  font-weight: 500;
}

.qr-container {
  padding: 12px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 20px;
  border: 0.5px solid var(--ios-separator, rgba(60, 60, 67, 0.08));
}

.qr-image {
  width: 180px;
  height: 180px;
  display: block;
}

.card-table-badge {
  font-size: 22px;
  font-weight: 800;
  color: #000;
  letter-spacing: 0.5px;
  background: #f2f2f7;
  padding: 6px 16px;
  border-radius: 20px;
}

.card-table-badge.placeholder {
  color: var(--ios-tertiary, #8e8e93);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0px;
}

.ios-section-header {
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: var(--ios-tertiary, #6c6c70);
  margin: 0 16px 8px;
}

.ios-grouped-card {
  background: var(--ios-card, #ffffff);
  border-radius: 10px;
  margin-bottom: 24px;
  overflow: hidden;
  box-shadow: 0 0 0 0.5px rgba(0,0,0,0.04);
  transition: background-color 0.3s ease;
}

.input-row {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  gap: 12px;
  border-bottom: 0.5px solid var(--ios-separator, rgba(60, 60, 67, 0.12));
}

.input-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.ios-input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 16px;
  color: var(--ios-label, #000);
  outline: none;
  padding: 4px 0;
  transition: color 0.3s ease;
}

.ios-input::placeholder {
  color: var(--ios-tertiary, #8e8e93);
}

.url-display-row {
  display: flex;
  flex-direction: column;
  padding: 10px 16px;
  gap: 4px;
}

.url-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--ios-tertiary, #8e8e93);
  text-transform: uppercase;
}

.url-text {
  font-size: 12px;
  color: var(--ios-secondary, #3c3c43);
  word-break: break-all;
  user-select: all;
  font-family: monospace;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 4px;
}

.ios-action-btn {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: none;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.1s ease, opacity 0.15s ease;
}

.ios-action-btn:active {
  transform: scale(0.97);
}

.print-btn {
  background: var(--ios-blue, #007aff);
  color: #ffffff;
}

.copy-btn {
  background: rgba(120, 120, 128, 0.12);
  color: var(--ios-blue, #007aff);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
