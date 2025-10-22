import { defineStore } from 'pinia'

export type Note = {
  id: string
  title: string
  content: string
  createdAt: number
  updatedAt: number
}

type State = {
  notes: Note[]
  selectedId: string | null
  loaded: boolean
}

const STORAGE_KEY = 'notes_app_v1'

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function now() {
  return Date.now()
}

function loadFromLocal(): State | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.notes)) return null
    return parsed
  } catch {
    return null
  }
}

function saveToLocal(state: State) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore storage errors (quota / private mode)
  }
}

/**
 * PUBLIC_INTERFACE
 * useNotesStore
 * A Pinia store for managing personal notes. Provides CRUD actions and
 * localStorage persistence to work offline. Includes selection handling.
 */
export const useNotesStore = defineStore('notes', {
  state: (): State => ({
    notes: [],
    selectedId: null,
    loaded: false,
  }),

  getters: {
    /** Get notes sorted by updatedAt desc for display */
    sortedNotes: (state): Note[] =>
      [...state.notes].sort((a, b) => b.updatedAt - a.updatedAt),

    /** Current selected note object or null */
    selectedNote: (state): Note | null =>
      state.notes.find(n => n.id === state.selectedId) || null,
  },

  actions: {
    /**
     * PUBLIC_INTERFACE
     * init
     * Load notes from localStorage; if empty, seed with a few sample notes.
     */
    init() {
      if (this.loaded) return
      const loaded = process.client ? loadFromLocal() : null
      if (loaded) {
        this.notes = loaded.notes
        this.selectedId = loaded.selectedId
      } else {
        // Seed with sample notes on first load
        const sample: Note[] = [
          {
            id: uid(),
            title: 'Welcome to Personal Notes',
            content:
              'This is your space to jot down thoughts.\n\nTips:\n- Create a new note with the + New button.\n- Click a note in the sidebar to edit.\n- Changes auto-save locally.',
            createdAt: now(),
            updatedAt: now(),
          },
          {
            id: uid(),
            title: 'Ocean Professional Theme',
            content:
              'We use a clean, modern look with blue (#2563EB) and amber (#F59E0B) accents.\nRounded corners and subtle gradients provide depth.',
            createdAt: now(),
            updatedAt: now(),
          },
        ]
        this.notes = sample
        this.selectedId = sample[0]?.id || null
      }
      this.loaded = true
      this.persist()
    },

    /**
     * PUBLIC_INTERFACE
     * createNote
     * Create a new note and select it.
     * Returns the created note.
     */
    createNote(title = 'Untitled Note', content = ''): Note {
      const note: Note = {
        id: uid(),
        title,
        content,
        createdAt: now(),
        updatedAt: now(),
      }
      this.notes.unshift(note)
      this.selectedId = note.id
      this.persist()
      return note
    },

    /**
     * PUBLIC_INTERFACE
     * updateNote
     * Update a note's title/content by id and refresh updatedAt.
     */
    updateNote(id: string, payload: Partial<Pick<Note, 'title' | 'content'>>) {
      const idx = this.notes.findIndex(n => n.id === id)
      if (idx === -1) return
      const next = { ...this.notes[idx], ...payload, updatedAt: now() }
      this.notes.splice(idx, 1, next)
      this.persist()
    },

    /**
     * PUBLIC_INTERFACE
     * deleteNote
     * Remove a note by id. Adjust selection if the deleted note was selected.
     */
    deleteNote(id: string) {
      const idx = this.notes.findIndex(n => n.id === id)
      if (idx === -1) return
      const wasSelected = this.notes[idx].id === this.selectedId
      this.notes.splice(idx, 1)
      if (wasSelected) {
        this.selectedId = this.notes[0]?.id || null
      }
      this.persist()
    },

    /**
     * PUBLIC_INTERFACE
     * selectNote
     * Set the currently selected note id.
     */
    selectNote(id: string | null) {
      this.selectedId = id
      this.persist()
    },

    /**
     * PUBLIC_INTERFACE
     * persist
     * Save current state to localStorage if running on client.
     */
    persist() {
      if (!process.client) return
      saveToLocal({
        notes: this.notes,
        selectedId: this.selectedId,
        loaded: this.loaded,
      })
    },
  },
})
