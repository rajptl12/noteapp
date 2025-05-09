// src/App.js
import React, { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const addOrUpdateNote = (note) => {
    if (editingNote) {
      setNotes(notes.map(n => (n.id === note.id ? note : n)));
      setEditingNote(null);
    } else {
      setNotes([...notes, note]);
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const exportNotes = () => {
    const blob = new Blob([JSON.stringify(notes, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "my-notes.json";
    link.click();
  };

  const filteredNotes = notes
    .filter(
      (note) =>
        note.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (note.tag && note.tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <div className={`container my-4 ${darkMode ? "bg-dark text-white" : "bg-light"}`}>
      <h2 className="text-center">📝 Notes App</h2>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`btn ${darkMode ? "btn-light" : "btn-dark"} float-end`}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <NoteForm addNote={addOrUpdateNote} editingNote={editingNote} />

      <input
        type="text"
        placeholder="Search notes..."
        className="form-control my-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button onClick={exportNotes} className="btn btn-success mb-3">
        Download Notes
      </button>

      <div className="row">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            editNote={() => setEditingNote(note)}
            updateNote={addOrUpdateNote}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
