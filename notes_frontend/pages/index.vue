<template>
  <LayoutShell>
    <main class="max-w-7xl mx-auto px-4">
      <div class="grid gap-4 py-4" :class="gridCls">
        <section class="rounded elevated" style="background: var(--color-surface);" aria-label="Sidebar">
          <NoteList
            @select="onSelect"
            @create="onCreate"
            @deleted="onDeleted"
          />
        </section>

        <section class="rounded elevated" style="background: var(--color-surface);" aria-label="Editor">
          <NoteEditor :note-id="selectedId" />
        </section>
      </div>
    </main>
  </LayoutShell>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useNotesStore } from '~/stores/useNotesStore'
import NoteList from '~/components/NoteList.vue'
import NoteEditor from '~/components/NoteEditor.vue'
import LayoutShell from '~/components/LayoutShell.vue'
import { useToasts } from '~/composables/useToasts'

const notes = useNotesStore()

onMounted(() => {
  notes.init()
})

const selectedId = computed(() => notes.selectedId)

function onSelect(id: string) {
  notes.selectNote(id)
}

function onCreate() {
  const n = notes.createNote()
  notes.selectNote(n.id)
}

const { showToast } = useToasts()
function onDeleted(_id: string) {
  showToast('Note removed', 'error')
}

const gridCls = computed(() =>
  'grid-cols-1 md:grid-cols-[minmax(260px,320px)_1fr]'
)
</script>
