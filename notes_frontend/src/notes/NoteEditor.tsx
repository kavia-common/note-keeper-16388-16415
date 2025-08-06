import React, { useState } from "react";
import { Note } from "./types";

// PUBLIC_INTERFACE
export default function NoteEditor({
  note,
  onSave,
  onCancel,
  onDelete,
}: {
  note: Note;
  onSave: (note: Note) => void;
  onCancel: () => void;
  onDelete: (_id: string) => void;
}) {
  const [data, setData] = useState({ ...note });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(data as Note);
  };

  return (
    <form className="note-editor" onSubmit={handleSubmit}>
      <input
        className="title-input"
        name="title"
        placeholder="Title"
        value={data.title}
        onChange={handleChange}
        autoFocus
      />
      <textarea
        className="content-input"
        name="content"
        placeholder="Write your note..."
        value={data.content}
        onChange={handleChange}
        rows={12}
      />
      <div className="editor-actions">
        <button className="primary" type="submit">
          Save
        </button>
        <button className="secondary" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="accent"
          type="button"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </form>
  );
}
