import React from "react";

// PUBLIC_INTERFACE
// Top bar with actions (add note, logout)
export default function TopBar({
  onAddNote,
  onLogout,
  disableAdd,
}: {
  onAddNote: () => void;
  onLogout: () => void;
  disableAdd?: boolean;
}) {
  return (
    <div className="topbar">
      <button className="primary" onClick={onAddNote} disabled={disableAdd}>
        + Note
      </button>
      <button className="secondary right" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
