import { ref } from 'vue'

export type ToastType = 'info' | 'success' | 'error'
export type Toast = { id: string; message: string; type: ToastType }

/**
 * PUBLIC_INTERFACE
 * useToasts
 * Global toast state and methods. Import in components to display status messages.
 */
const toasts = ref<Toast[]>([])

export function useToasts() {
  return {
    toasts,
    /**
     * PUBLIC_INTERFACE
     * showToast
     * Show a toast message for a short duration. Accessible live region.
     */
    showToast(message: string, type: ToastType = 'info', ms = 2200) {
      const id = Math.random().toString(36).slice(2)
      const toast: Toast = { id, message, type }
      toasts.value.push(toast)
      setTimeout(() => {
        toasts.value = toasts.value.filter(t => t.id !== id)
      }, ms)
    }
  }
}
