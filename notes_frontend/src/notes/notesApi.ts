import { Note } from "./types";

/* To adapt for real REST API, replace URL and add real fetch with credentials/header */
const _API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api";

// PUBLIC_INTERFACE
export async function fetchNotes(): Promise<Note[]> {
  // Dummy: Replace with real API call
  const notes = localStorage.getItem("notes");
  if (notes) return JSON.parse(notes);
  return [];
}

// PUBLIC_INTERFACE
export async function createNote(data: Partial<Note>): Promise<Note> {
  // Dummy: Replace with real API call
  const note: Note = {
    id: String(Date.now()),
    title: data.title || "Untitled",
    content: data.content || "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const notes = await fetchNotes();
  const updated = [note, ...notes];
  localStorage.setItem("notes", JSON.stringify(updated));
  return note;
}

// PUBLIC_INTERFACE
export async function updateNote(updatedNote: Note): Promise<Note> {
  const notes = await fetchNotes();
  const next = notes.map(n => (n.id === updatedNote.id ? { ...updatedNote, updated_at: new Date().toISOString() } : n));
  localStorage.setItem("notes", JSON.stringify(next));
  return { ...updatedNote, updated_at: new Date().toISOString() };
}

// PUBLIC_INTERFACE
export async function deleteNote(id: string): Promise<void> {
  const notes = await fetchNotes();
  const next = notes.filter(n => n.id !== id);
  localStorage.setItem("notes", JSON.stringify(next));
}
