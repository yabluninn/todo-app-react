/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const NoteListContext = createContext();

export const NoteListProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const removeNote = (noteId) => {
    const newNotes = notes.filter((note) => note.id != noteId);
    setNotes(newNotes);
  };

  const getNotesLength = () => {
    return notes.length;
  };

  return (
    <NoteListContext.Provider
      value={{ notes, addNote, removeNote, getNotesLength }}
    >
      {children}
    </NoteListContext.Provider>
  );
};

export const useNoteList = () => useContext(NoteListContext);
export default NoteListContext;
