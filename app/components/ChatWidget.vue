<template>
  <div class="chat-widget">
    <!-- Floating button -->
    <button class="chat-fab" :class="{ 'is-open': isOpen }" @click="toggle" :aria-label="t('chatTitle')">
      <!-- Chat bubble icon -->
      <svg v-if="!isOpen" class="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <path
          d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
      <!-- Close icon -->
      <svg v-else class="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"
        stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>

    <!-- Chat panel -->
    <Transition name="chat-pop">
      <div v-if="isOpen" class="chat-panel">
        <!-- Header -->
        <div class="chat-header">
          <div class="chat-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
          </div>
          <div class="chat-heading">
            <div class="chat-title">{{ t('chatTitle') }}</div>
            <div class="chat-status"><span class="status-dot"></span>{{ t('chatSubtitle') }}</div>
          </div>
          <button class="chat-close" @click="toggle" :aria-label="t('done')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <!-- Messages -->
        <div ref="scrollEl" class="chat-messages">
          <div v-for="(m, i) in messages" :key="i" class="msg-row"
            :class="m.from === 'user' ? 'from-user' : 'from-bot'">
            <div class="bubble">{{ m.text }}</div>
          </div>

          <div v-if="isSending" class="msg-row from-bot">
            <div class="bubble typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>

        <!-- Input -->
        <form class="chat-input" @submit.prevent="send">
          <input v-model="draft" type="text" :placeholder="t('chatPlaceholder')" autocomplete="off"
            :disabled="isSending" />
          <button type="submit" class="send-btn" :disabled="!draft.trim() || isSending" :aria-label="'Send'">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'

const { t, lang } = useLang()

const isOpen = ref(false)
const draft = ref('')
const isSending = ref(false)
const messages = ref([])
const scrollEl = ref(null)
// Carries an in-progress order (e.g. waiting for the customer's name) between turns
const pending = ref(null)

const scrollToBottom = async () => {
  await nextTick()
  if (scrollEl.value) scrollEl.value.scrollTop = scrollEl.value.scrollHeight
}

const toggle = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    if (messages.value.length === 0) {
      messages.value.push({ from: 'bot', text: t('chatGreeting') })
    }
    scrollToBottom()
  }
}

const send = async () => {
  const text = draft.value.trim()
  if (!text || isSending.value) return

  messages.value.push({ from: 'user', text })
  draft.value = ''
  isSending.value = true
  scrollToBottom()

  try {
    const res = await $fetch('/api/chat/send', {
      method: 'POST',
      body: { message: text, lang: lang.value, pending: pending.value }
    })
    if (res?.success && res.reply) {
      pending.value = res.pending ?? null
      messages.value.push({ from: 'bot', text: res.reply })
    } else {
      messages.value.push({ from: 'bot', text: t('chatError') })
    }
  } catch (e) {
    messages.value.push({ from: 'bot', text: t('chatError') })
  } finally {
    isSending.value = false
    scrollToBottom()
  }
}

watch(messages, scrollToBottom, { deep: true })
</script>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1500;
}

/* ── Floating action button ── */
.chat-fab {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(135deg, var(--ios-blue, #007aff), #0a84ff);
  box-shadow: 0 8px 24px rgba(0, 122, 255, 0.45), 0 2px 6px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
  margin-left: auto;
}

.chat-fab:hover {
  transform: scale(1.06);
}

.chat-fab:active {
  transform: scale(0.94);
}

.chat-fab.is-open {
  background: var(--ios-tertiary, #8e8e93);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}

.fab-icon {
  width: 26px;
  height: 26px;
}

/* ── Panel ── */
.chat-panel {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 360px;
  max-width: calc(100vw - 32px);
  height: 520px;
  max-height: calc(100dvh - 110px);
  background: var(--ios-card, #fff);
  border-radius: 20px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28), 0 0 1px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 0.5px solid var(--ios-separator, rgba(60, 60, 67, 0.12));
}

/* ── Header ── */
.chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: linear-gradient(135deg, var(--ios-blue, #007aff), #0a84ff);
  color: #fff;
}

.chat-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chat-avatar svg {
  width: 20px;
  height: 20px;
}

.chat-heading {
  flex: 1;
  min-width: 0;
}

.chat-title {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.2px;
}

.chat-status {
  font-size: 12px;
  opacity: 0.92;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 1px;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #30d158;
  box-shadow: 0 0 0 2px rgba(48, 209, 88, 0.3);
  flex-shrink: 0;
}

.chat-close {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s ease;
}

.chat-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.chat-close svg {
  width: 17px;
  height: 17px;
}

/* ── Messages ── */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--ios-bg, #f2f2f7);
}

.msg-row {
  display: flex;
}

.from-user {
  justify-content: flex-end;
}

.from-bot {
  justify-content: flex-start;
}

.bubble {
  max-width: 78%;
  padding: 9px 13px;
  border-radius: 18px;
  font-size: 14.5px;
  line-height: 1.4;
  word-wrap: break-word;
  white-space: pre-wrap;
  animation: bubbleIn 0.25s ease;
}

.from-user .bubble {
  background: linear-gradient(135deg, var(--ios-blue, #007aff), #0a84ff);
  color: #fff;
  border-bottom-right-radius: 5px;
}

.from-bot .bubble {
  background: var(--ios-card, #fff);
  color: var(--ios-label, #000);
  border: 0.5px solid var(--ios-separator, rgba(60, 60, 67, 0.12));
  border-bottom-left-radius: 5px;
}

@keyframes bubbleIn {
  from {
    opacity: 0;
    transform: translateY(6px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Typing indicator */
.typing {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 12px 14px;
}

.typing span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ios-tertiary, #8e8e93);
  animation: typingBounce 1.2s infinite ease-in-out;
}

.typing span:nth-child(2) {
  animation-delay: 0.15s;
}

.typing span:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes typingBounce {

  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }

  30% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

/* ── Input ── */
.chat-input {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: var(--ios-card, #fff);
  border-top: 0.5px solid var(--ios-separator, rgba(60, 60, 67, 0.12));
}

.chat-input input {
  flex: 1;
  border: none;
  outline: none;
  background: var(--ios-bg, #f2f2f7);
  color: var(--ios-label, #000);
  border-radius: 20px;
  padding: 10px 14px;
  font-size: 14.5px;
  font-family: inherit;
}

.chat-input input::placeholder {
  color: var(--ios-tertiary, #8e8e93);
}

.send-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: var(--ios-blue, #007aff);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.send-btn:disabled {
  opacity: 0.4;
  cursor: default;
}

.send-btn:not(:disabled):active {
  transform: scale(0.9);
}

.send-btn svg {
  width: 18px;
  height: 18px;
}

/* ── Transition ── */
.chat-pop-enter-active {
  transition: all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.chat-pop-leave-active {
  transition: all 0.2s ease;
}

.chat-pop-enter-from,
.chat-pop-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

@media (max-width: 480px) {
  .chat-widget {
    bottom: 16px;
    right: 16px;
  }

  .chat-panel {
    width: calc(100vw - 24px);
    height: 70dvh;
    right: -4px;
  }
}
</style>
