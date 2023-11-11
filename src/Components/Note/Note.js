
import React from 'react';
import { useDrag } from 'react-dnd';
import deleteIcon from '../../assets/delete.svg';
import './Note.css';

let timer = 500,
  timeout;

function Note(props) {
  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);
    const monthNames = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    let hrs = date.getHours();
    let amPm = hrs >= 12 ? "PM" : "AM";
    hrs = hrs ? hrs : "12";
    hrs = hrs > 12 ? (hrs = 24 - hrs) : hrs;

    let min = date.getMinutes();
    min = min < 10 ? "0" + min : min;

    let day = date.getDate();
    const month = monthNames[date.getMonth()];

    return `${hrs}:${min} ${amPm} ${day} ${month}`;
  };

  const debounce = (func) => {
    // ... (your existing code)
    clearTimeout(timeout);
    timeout = setTimeout(func, timer);
  };

  const updateText = (text, id) => {
    debounce(() => props.updateText(text, id));
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'NOTE',
    item: { id: props.note.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      className="note"
      style={{ backgroundColor: props.note.color }}
      ref={drag}
    >
      <textarea
        className="note_text"
        defaultValue={props.note.text}
        onChange={(event) => updateText(event.target.value, props.note.id)}
      />
       
       <div className="attachments">
        {/* Add attachment links, files, or images here */}
        <p>Attachments:</p>
        {props.note.attachments &&
          props.note.attachments.map((attachment, index) => (
            <a key={index} href={attachment} target="_blank" rel="noopener noreferrer">
              Attachment {index + 1}
            </a>
          ))}
      </div>

      <div className="note_footer">
        <p>{formatDate(props.note.time)}</p>
        <img
          src={deleteIcon}
          alt="DELETE"
          onClick={() => props.deleteNote(props.note.id)}
        />
      </div>
    </div>
  );
}

export default Note;
