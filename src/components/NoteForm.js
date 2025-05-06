// src/components/NoteForm.js
import React, { useState, useEffect } from "react";

function NoteForm({ addNote, editingNote }) {
  const [text, setText] = useState("");
  const [tag, setTag] = useState("");
  const [color, setColor] = useState("#f8f9fa");
  const [category, setCategory] = useState("");
  const [pinned, setPinned] = useState(false);
  const [reminderDate, setReminderDate] = useState("");
  const [locked, setLocked] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (editingNote) {
      setText(editingNote.text);
      setTag(editingNote.tag);
      setColor(editingNote.color);
      setCategory(editingNote.category || "");
      setPinned(editingNote.pinned || false);
      setReminderDate(editingNote.reminderDate || "");
      setLocked(editingNote.locked || false);
      setPassword(editingNote.password || "");
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const note = {
      id: editingNote ? editingNote.id : Date.now(),
      text,
      tag,
      color,
      category,
      pinned,
      reminderDate,
      locked,
      password,
      createdAt: editingNote ? editingNote.createdAt : new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };

    addNote(note);
    setText("");
    setTag("");
    setColor("#f8f9fa");
    setCategory("");
    setPinned(false);
    setReminderDate("");
    setLocked(false);
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded">
      <textarea
        className="form-control mb-2"
        placeholder="Write your note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Tag (e.g. Work, Personal)"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <label>Choose a color:</label>
      <input
        type="color"
        className="form-control form-control-color mb-2"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          checked={pinned}
          onChange={() => setPinned(!pinned)}
        />
        <label className="form-check-label">Pin this note</label>
      </div>
      <input
        type="datetime-local"
        className="form-control mb-2"
        value={reminderDate}
        onChange={(e) => setReminderDate(e.target.value)}
      />
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          checked={locked}
          onChange={() => setLocked(!locked)}
        />
        <label className="form-check-label">Lock note with password</label>
      </div>
      {locked && (
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}
      <button type="submit" className="btn btn-primary w-100">
        {editingNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}

export default NoteForm;