import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const hook = () => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  };

  useEffect(hook, []);
  if(!notes) {
    return null
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMsg(
          `Note: '${note.content}' was already deleted from the server.`
        );
        setTimeout(() => {
          setErrorMsg(null);
        }, 5000);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  const deleteNote = (event) => {
    const id = event.target.id;
    const getNote = notes.filter((note) => note.id == id);

    if (window.confirm(`Delete ${getNote[0].content}?`)) {
      noteService
      .deleteNote(id).then((deleted) => {
        setNotes(notes.filter((note) => note.id !== id));
      }).catch((error) => {
        setErrorMsg(`Unable to delete note.`);
        setTimeout(() => {
          setErrorMsg(null);
        }, 5000);
      });
    }
    
  };

  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMsg} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}{" "}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            deleteNote={deleteNote}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
      <Footer  />
    </>
  );
};

export default App;
