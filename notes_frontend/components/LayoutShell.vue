<template>
  <div>
    <HeaderBar @new-note="onCreate" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import HeaderBar from '~/components/HeaderBar.vue'
import { useNotesStore } from '~/stores/useNotesStore'
import { useToasts } from '~/composables/useToasts'

const notes = useNotesStore()
const { showToast } = useToasts()

function onCreate() {
  const n = notes.createNote()
  notes.selectNote(n.id)
  showToast('New note created', 'success')
}
</script>
