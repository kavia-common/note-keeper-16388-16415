import React from "react";
import { Note } from "./types";

// PUBLIC_INTERFACE
// Sidebar navigation listing notes (as "folders") for this MVP
export default function Sidebar({
  notes,
  selectedNoteId,
  onSelectNote,
  onAddNote,
}: {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
  onAddNote: () => void;
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>NoteKeeper</h1>
        <button className="accent add-note-btn" onClick={onAddNote}>
          + New Note
        </button>
      </div>
      <ul className="note-list">
        {notes.length === 0 && <li className="empty">No notes yet.</li>}
        {notes.map(note => (
          <li
            key={note.id}
            className={note.id === selectedNoteId ? "selected" : ""}
            onClick={() => onSelectNote(note.id)}
          >
            <span className="note-title">{note.title || "Untitled"}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
