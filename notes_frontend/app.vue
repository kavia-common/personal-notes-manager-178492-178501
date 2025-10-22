<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <NuxtRouteAnnouncer />
    <HeaderBar />
    <NuxtPage />
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
// Register global components
import HeaderBar from '~/components/HeaderBar.vue'
import ToastContainer from '~/components/ToastContainer.vue'
</script>

<style>
:root {
  --color-primary: #2563EB;
  --color-secondary: #F59E0B;
  --color-success: #F59E0B;
  --color-error: #EF4444;
  --color-text: #111827;
  --color-bg: #f9fafb;
  --color-surface: #ffffff;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

button, input, textarea {
  font-family: inherit;
}

/* Utility classes for subtle gradient backgrounds */
.surface-card {
  background: linear-gradient(180deg, rgba(59,130,246,0.06) 0%, rgba(249,250,251,0.6) 100%);
}

.elevated {
  box-shadow: 0 4px 20px rgba(17, 24, 39, 0.06);
}

.rounded {
  border-radius: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: var(--color-primary);
  color: white;
  cursor: pointer;
  transition: all .2s ease-in-out;
}

.btn:focus {
  outline: 3px solid rgba(37,99,235,0.3);
  outline-offset: 2px;
}

.btn.secondary {
  background: var(--color-secondary);
  color: #1f2937;
}

.btn.ghost {
  background: transparent;
  color: var(--color-primary);
  border-color: rgba(37,99,235,0.25);
}

.btn.danger {
  background: var(--color-error);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.25);
}

.input, .textarea {
  width: 100%;
  border: 1px solid #e5e7eb;
  background: var(--color-surface);
  border-radius: 10px;
  padding: 10px 12px;
  color: var(--color-text);
  transition: border-color .2s, box-shadow .2s;
}

.input:focus, .textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(37,99,235,0.15);
}

.textarea {
  min-height: 240px;
  resize: vertical;
}
</style>
