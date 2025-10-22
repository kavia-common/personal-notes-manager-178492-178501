<template>
  <section class="h-full flex flex-col" aria-label="Note editor section">
    <div class="p-4">
      <div class="rounded elevated surface-card">
        <div class="p-4">
          <label for="title" class="block text-sm font-medium mb-2">Title</label>
          <input
            id="title"
            v-model="draftTitle"
            class="input"
            type="text"
            placeholder="Note title"
            @input="onInput"
          />
        </div>
        <div class="p-4 pt-0">
          <label for="content" class="block text-sm font-medium mb-2">Content</label>
          <textarea
            id="content"
            v-model="draftContent"
            class="textarea"
            placeholder="Start typing..."
            @input="onInput"
          />
        </div>
        <div class="p-4 pt-0 flex items-center gap-2">
          <button class="btn" @click="save" aria-label="Save note changes">
            💾 Save
          </button>
          <button class="btn ghost" @click="revert" aria-label="Discard changes">
            ↩︎ Revert
          </button>
        </div>
      </div>
    </div>

    <div v-if="!note" class="p-6 text-center">
      <p style="color:#6b7280;">Select a note from the list or create a new one.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNotesStore } from '~/stores/useNotesStore'
import { useToasts } from '~/composables/useToasts'

const props = defineProps<{ noteId: string | null }>()
const notes = useNotesStore()

const note = computed(() => {
  if (!props.noteId) return null
  return notes.notes.find(n => n.id === props.noteId) || null
})

const draftTitle = ref('')
const draftContent = ref('')

watch(note, (val) => {
  draftTitle.value = val?.title || ''
  draftContent.value = val?.content || ''
}, { immediate: true })

let debounceTimer: number | undefined

function onInput() {
  // Debounced autosave for a responsive UX
  if (debounceTimer) window.clearTimeout(debounceTimer)
  debounceTimer = window.setTimeout(() => {
    save(false)
  }, 600)
}

/**
 * PUBLIC_INTERFACE
 * save
 * Save current draft to the store. If show is true, show a toast.
 */
const { showToast } = useToasts()
function save(show = true) {
  if (!note.value) return
  const id = note.value.id
  notes.updateNote(id, { title: draftTitle.value, content: draftContent.value })
  if (show) {
    showToast('Changes saved', 'success')
  }
}

/**
 * PUBLIC_INTERFACE
 * revert
 * Revert draft to note's persisted content.
 */
function revert() {
  draftTitle.value = note.value?.title || ''
  draftContent.value = note.value?.content || ''
  showToast('Reverted changes', 'info')
}
</script>
