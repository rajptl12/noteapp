// src/components/NoteCard.js
import React, { useState } from "react";

function NoteCard({ note, deleteNote, editNote, updateNote }) {
  const [unlocked, setUnlocked] = useState(!note.locked);
  const [enteredPassword, setEnteredPassword] = useState("");

  const checkPassword = () => {
    if (enteredPassword === note.password) {
      setUnlocked(true);
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="col-md-4 my-2">
      <div className="card" style={{ backgroundColor: note.color }}>
        <div className="card-body">
          {note.locked && !unlocked ? (
            <>
              <input
                type="password"
                className="form-control mb-2"
                placeholder="Enter password to unlock"
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
              />
              <button className="btn btn-sm btn-dark" onClick={checkPassword}>
                Unlock
              </button>
            </>
          ) : (
            <>
              <p>{note.text}</p>
              {note.tag && <span className="badge bg-secondary me-2">{note.tag}</span>}
              {note.category && <span className="badge bg-info">{note.category}</span>}
              {note.reminderDate && (
                <div className="mt-2">
                  <small className="text-danger">⏰ Reminder: {note.reminderDate}</small>
                </div>
              )}
              <div>
                <small className="text-muted d-block">Created: {note.createdAt}</small>
                <small className="text-muted d-block">Updated: {note.updatedAt}</small>
              </div>
              <div className="mt-2">
                <button onClick={editNote} className="btn btn-sm btn-warning me-2">
                  Edit
                </button>
                <button onClick={() => deleteNote(note.id)} className="btn btn-sm btn-danger">
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
