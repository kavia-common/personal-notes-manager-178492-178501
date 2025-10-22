<template>
  <aside class="h-full flex flex-col" aria-label="Notes list sidebar">
    <div class="p-3">
      <div class="flex gap-2">
        <input
          v-model="query"
          class="input"
          type="search"
          placeholder="Search notes..."
          aria-label="Search notes"
        />
        <button class="btn" @click="onCreate" aria-label="Create new note">
          ＋
        </button>
      </div>
    </div>

    <div class="px-3 pb-3">
      <div class="rounded elevated" style="background: var(--color-surface);">
        <ul class="m-0 list-none p-0 max-h-[calc(100vh-220px)] overflow-auto" role="listbox" :aria-label="`Notes (${filtered.length})`">
          <li
            v-for="n in filtered"
            :key="n.id"
            :aria-selected="n.id === notesStore.selectedId"
            class="cursor-pointer border-b last:border-b-0"
            :class="n.id === notesStore.selectedId ? 'bg-blue-50' : ''"
            @click="onSelect(n.id)"
            role="option"
            tabindex="0"
            @keydown.enter.prevent="onSelect(n.id)"
          >
            <div class="px-3 py-3 flex items-start gap-3">
              <div class="w-2 h-2 mt-2 rounded-full" :style="dotStyle(n)"></div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-2">
                  <h3 class="m-0 text-sm font-semibold truncate">{{ n.title || 'Untitled' }}</h3>
                  <time class="text-xs" style="color:#6b7280;">{{ formatDate(n.updatedAt) }}</time>
                </div>
                <p class="m-0 mt-1 text-xs line-clamp-2" style="color:#6b7280;">
                  {{ (n.content || '').split('\n')[0] }}
                </p>
              </div>
              <button class="btn ghost" @click.stop="confirmDelete(n.id)" aria-label="Delete note">🗑</button>
            </div>
          </li>
        </ul>

        <div v-if="filtered.length === 0" class="p-6 text-center">
          <p class="m-0" style="color:#6b7280;">No notes found. Create one to get started.</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNotesStore } from '~/stores/useNotesStore'
import { useToasts } from '~/composables/useToasts'

const emit = defineEmits<{ (e: 'select', id: string): void; (e: 'create'): void; (e: 'deleted', id: string): void }>()
const notesStore = useNotesStore()
const query = ref('')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  const base = notesStore.sortedNotes
  if (!q) return base
  return base.filter(n =>
    (n.title || '').toLowerCase().includes(q) ||
    (n.content || '').toLowerCase().includes(q)
  )
})

function formatDate(ts: number) {
  const d = new Date(ts)
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function onSelect(id: string) {
  notesStore.selectNote(id)
  emit('select', id)
}

const { showToast } = useToasts()
function onCreate() {
  const created = notesStore.createNote()
  emit('create')
  showToast('New note created', 'success')
  // Select created note
  notesStore.selectNote(created.id)
}

function confirmDelete(id: string) {
  const ok = window.confirm('Delete this note? This action cannot be undone.')
  if (ok) {
    notesStore.deleteNote(id)
    emit('deleted', id)
    showToast('Note deleted', 'error')
  }
}

function dotStyle(n: { id: string }) {
  const selected = n.id === notesStore.selectedId
  return `background:${selected ? 'var(--color-primary)' : '#d1d5db'};`
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
