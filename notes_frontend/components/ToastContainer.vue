<template>
  <div class="fixed bottom-4 right-4 space-y-2" role="status" aria-live="polite">
    <transition-group name="toast" tag="div">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="rounded elevated"
        :style="styleFor(t.type)"
        role="alert"
        tabindex="0"
      >
        <div class="px-4 py-3 text-sm font-medium">{{ t.message }}</div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToasts } from '~/composables/useToasts'

const { toasts } = useToasts()

function styleFor(type: 'info' | 'success' | 'error') {
  const base = 'background: #ffffff;'
  if (type === 'success') {
    return `${base} border-left: 4px solid var(--color-secondary);`
  }
  if (type === 'error') {
    return `${base} border-left: 4px solid var(--color-error);`
  }
  return `${base} border-left: 4px solid var(--color-primary);`
}
</script>

<style scoped>
.toast-enter-active, .toast-leave-active {
  transition: all .2s ease;
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
