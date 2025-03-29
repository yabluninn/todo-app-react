/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Note from "../notes/Note";
import {useListsContext} from "../../../contexts/ListsContext.jsx";
import ContextMenu from "../../contextMenus/ContextMenu.jsx";
import ContextMenuButton from "../../contextMenus/ContextMenuButton.jsx";
import {SORTING_ACTIONS} from "../../../constants/sorting-actions.js";

import "../../../styles/notes/NoteListContainer.css"

export default function NoteListContainer({ list, onNoteSideOpen }) {
  const [isNotesVisible, setNotesVisibility] = useState(false);

  const [notesContextMenuVisible, setNotesContextMenuVisible] = useState(false);
  const [notesMenuPosition, setNotesMenuPosition] = useState({ top: 0, left: 1185 });

  const {removeNote, removeAllNotesFromList} = useListsContext()

  const toggleNotesVisibility = () => setNotesVisibility(!isNotesVisible);

  const toggleNotesContextMenuVisibility = (event) => {
    setNotesMenuPosition({
      top: window.scrollY + event.clientY  + 25,
      left: 1185
    });
    setNotesContextMenuVisible(!notesContextMenuVisible);
  };

  return (
    <div className="nlc-main">
      <div
          className="nlc-header"
          style={{
            borderBottom: isNotesVisible ? "1px solid #eee" : "0",
            paddingBottom: isNotesVisible ? "8px" : "",
          }}
      >
        <button
            onClick={toggleNotesVisibility}
        >
          <i
              className={`hgi-stroke ${isNotesVisible ? "hgi-arrow-up-01" : "hgi-arrow-down-01"} nlc-header-icon`}
          ></i>
        </button>
        <div className="nlc-color-icon" style={{border: `2px solid ${list.color}`}}></div>
        <p className="nlc-list-name">{list.name}</p>
        <div className="nlc-notes-count">{list.notes.length}</div>
        <div className="tlc-actions">
          <button className="tlc-sort-button" onClick={toggleNotesContextMenuVisibility}>
            <i className="hgi-stroke hgi-more-vertical nlc-sort-icon"></i>
          </button>
        </div>
      </div>
      <div className="nlc-notes" style={{display: isNotesVisible ? "" : "none"}}>
        {list.notes.map((note) => (
            <Note
                key={note._id}
                note={note}
                handleEdit={() => {
                  console.log("Note to edit:", note);
                  onNoteSideOpen(note);
                }}
                handleDelete={() => removeNote(note._id, note.listId)}
            />
        ))}

      </div>
      {notesContextMenuVisible && (
          <ContextMenu position={notesMenuPosition} toggleVisibility={toggleNotesContextMenuVisibility}>
            <ContextMenuButton title={"Remove All Notes"} icon={"hgi-stroke hgi-delete-02"} onClick={() => {
              removeAllNotesFromList(list._id);
            }} />
          </ContextMenu>)}
    </div>
  );
}
