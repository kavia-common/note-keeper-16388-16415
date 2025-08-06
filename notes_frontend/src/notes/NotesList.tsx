import React from "react";
import { Note } from "./types";

// PUBLIC_INTERFACE
export default function NotesList({
  notes,
  selectedNoteId,
  // onSelectNote, // (not used)
  onEditNote,
}: {
  notes: Note[];
  selectedNoteId: string | null;
  // onSelectNote: (id: string) => void;
  onEditNote: () => void;
}) {
  if (notes.length === 0)
    return <div className="empty-list">No notes. Click "+ Note" to create one!</div>;

  const note = notes.find(n => n.id === selectedNoteId);

  return (
    <div className="notes-list-view">
      {note ? (
        <div className="note-view">
          <div className="note-head">
            <h2>{note.title}</h2>
            <button className="accent" onClick={onEditNote}>
              Edit
            </button>
          </div>
          <div className="note-content">
            {note.content.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      ) : (
        <div className="note-view placeholder">
          Select a note to view.
        </div>
      )}
    </div>
  );
}
