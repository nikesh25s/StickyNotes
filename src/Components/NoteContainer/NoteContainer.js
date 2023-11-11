
import React, { useState } from 'react';
import Note from '../Note/Note';
import './NoteContainer.css';

function NoteContainer(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = props.notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const reversedNotes = filteredNotes.slice().reverse();

  return (
    <div className="note-container">
      <h2>Notes</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="note-container_notes custom-scroll">
        {reversedNotes.length > 0 ? (
          reversedNotes.map((item) => (
            <Note
              key={item.id}
              note={item}
              deleteNote={props.deleteNote}
              updateText={props.updateText}
            />
          ))
        ) : (
          <h3>No Notes present</h3>
        )}
      </div>
    </div>
  );
}




export default NoteContainer;
