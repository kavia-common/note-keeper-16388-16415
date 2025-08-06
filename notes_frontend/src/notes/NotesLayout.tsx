import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import NotesList from "./NotesList";
import NoteEditor from "./NoteEditor";
import { Note } from "./types";
import { fetchNotes, createNote, deleteNote, updateNote } from "./notesApi";

// PUBLIC_INTERFACE
// Main notes app layout
export default function NotesLayout() {
  const { logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    // Initial load
    void (async () => {
      setNotes(await fetchNotes());
    })();
  }, []);

  const handleSelectNote = (id: string) => {
    setSelectedNoteId(id);
    setIsEditorOpen(false);
  };

  const handleAddNote = async () => {
    const newNote = await createNote({ title: "Untitled", content: "" });
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
    setIsEditorOpen(true);
  };

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id);
    setNotes(notes.filter(n => n.id !== id));
    setSelectedNoteId(null);
    setIsEditorOpen(false);
  };

  const handleSaveNote = async (data: Note) => {
    const updated = await updateNote(data);
    setNotes(notes.map(n => (n.id === updated.id ? updated : n)));
    setSelectedNoteId(updated.id);
    setIsEditorOpen(false);
  };

  const selectedNote = notes.find(n => n.id === selectedNoteId) || null;

  return (
    <div className="app-shell">
      <Sidebar
        notes={notes}
        onSelectNote={handleSelectNote}
        selectedNoteId={selectedNoteId}
        onAddNote={handleAddNote}
      />
      <main className="main-content">
        <TopBar
          onAddNote={handleAddNote}
          onLogout={logout}
          disableAdd={isEditorOpen}
        />
        <div className="content-area">
          {isEditorOpen && selectedNote ? (
            <NoteEditor
              note={selectedNote}
              onSave={handleSaveNote}
              onCancel={() => setIsEditorOpen(false)}
              onDelete={handleDeleteNote}
            />
          ) : (
            <NotesList
              notes={notes}
              onSelectNote={handleSelectNote}
              selectedNoteId={selectedNoteId}
              onEditNote={() => setIsEditorOpen(true)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
