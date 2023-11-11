
import React, { useEffect, useState } from 'react';
import NoteContainer from './Components/NoteContainer/NoteContainer';
import Sidebar from './Components/Sidebar/Sidebar';
import DragAndDropProvider from './utils/DragAndDropProvider'; // Import the DragAndDropProvider
import './App.css';

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes-app")) || []
  );
  const [darkMode, setDarkMode] = useState(false);

  const addNote = (color) => {
    const tempNotes = [...notes];
    tempNotes.push({
      id: Date.now() + "" + Math.floor(Math.random() * 78),
      text: "",
      time: Date.now(),
      color,
    });
    setNotes(tempNotes);
  };

  const deleteNote = (id) => {
    const tempNotes = [...notes];
    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;
    tempNotes.splice(index, 1);
    setNotes(tempNotes);
  };

  const updateText = (text, id) => {
    const tempNotes = [...notes];
    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;
    tempNotes[index].text = text;
    setNotes(tempNotes);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }, [notes]);

  return (
    <DragAndDropProvider>
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        <Sidebar addNote={addNote} />
        <NoteContainer
          notes={notes}
          deleteNote={deleteNote}
          updateText={updateText}
        />
         <div className="dark-mode-toggle" onClick={toggleDarkMode}>
          <span className="toggle-icon">{darkMode ? '🌙' : '☀️'}</span>
          <label>
            Dark Mode
            <input type="checkbox" checked={darkMode} onChange={() => {}} />
          </label>
        </div>
      </div>
    </DragAndDropProvider>
  );
}

export default App;
