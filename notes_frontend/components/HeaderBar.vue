<template>
  <header
    class="sticky top-0 z-20"
    role="banner"
    aria-label="Application header"
  >
    <div
      class="surface-card elevated"
      style="backdrop-filter: saturate(180%) blur(6px);"
    >
      <div
        class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div
            aria-hidden="true"
            class="w-9 h-9 rounded-lg"
            :style="`background: linear-gradient(135deg, rgba(37,99,235,0.9), rgba(37,99,235,0.6)); box-shadow: 0 6px 18px rgba(37,99,235,.45);`"
          />
          <div>
            <h1 class="m-0 text-lg font-semibold" style="color: var(--color-text);">
              Personal Notes
            </h1>
            <p class="m-0 text-xs" style="color:#6b7280;">
              Ocean Professional
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button class="btn ghost" @click="$emit('new-note')" aria-label="Create new note">
            <span aria-hidden="true">＋</span> New
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'new-note'): void
}>()
</script>

<style scoped>
header { background: rgba(255,255,255,0.6); }
</style>
