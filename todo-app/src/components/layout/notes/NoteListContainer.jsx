/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Note from "../notes/Note";
import {useListsContext} from "../../../contexts/ListsContext.jsx";

export default function NoteListContainer({ list, onNoteSideOpen }) {
  const [isNotesVisible, setNotesVisibility] = useState(false);

  const {removeNote} = useListsContext()

  const toggleNotesVisibility = () => setNotesVisibility(!isNotesVisible);

  return (
    <div style={styles.main}>
      <i
        className="hgi-stroke hgi-note"
        style={{
          position: "absolute",
          color: "#bbb",
          marginLeft: "-50px",
          fontSize: "20px",
        }}
      ></i>
      <div
        style={{
          ...styles.header,
          borderBottom: isNotesVisible ? "1px solid #eee" : "0",
          paddingBottom: isNotesVisible ? "8px" : "",
        }}
      >
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={toggleNotesVisibility}
        >
          <i
            className={
              isNotesVisible
                ? "hgi-stroke hgi-arrow-up-01"
                : "hgi-stroke hgi-arrow-down-01"
            }
            style={styles.headerIcon}
          ></i>
        </button>
        <div
          style={{
            ...styles.icon,
            border: `2px solid ${list.color}`,
          }}
        ></div>
        <p style={styles.listName}>{list.name}</p>
        <div style={styles.notesCount}>{list.notes.length}</div>
        <div style={styles.actions}>
          <button style={styles.sortButton}>
            <i className="hgi-stroke hgi-filter" style={styles.sortIcon}></i>
          </button>
          <button style={styles.sortButton}>
            <i
              className="hgi-stroke hgi-sort-by-down-02"
              style={styles.sortIcon}
            ></i>
          </button>
        </div>
      </div>
      <div style={{ ...styles.notes, display: isNotesVisible ? "" : "none" }}>
        {list.notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleEdit={() => {
              console.log("Note to edit:", note);
              onNoteSideOpen(note);
            }}
            handleDelete={() => removeNote(note.id, note.listId)}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  main: {
    width: "100%",
    marginTop: "14px",
    backgroundColor: "white",
    padding: "12px",
    borderRadius: "8px",
    boxShadow: "rgba(99, 99, 99, 0.05) 0px 2px 12px 0px",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
    borderBottom: "1px solid #eee",
    paddingBottom: "8px",
  },
  headerIcon: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  icon: {
    width: "20px",
    height: "20px",
    marginRight: "12px",
    marginLeft: "16px",
    border: "2x solid",
    borderRadius: "8px",
  },
  listName: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  notesCount: {
    fontSize: "14px",
    backgroundColor: "#e6e6e6",
    borderRadius: "16px",
    paddingLeft: "6px",
    paddingRight: "6px",
    color: "#333",
    marginLeft: "12px",
  },
  notes: {
    marginLeft: "64px",
    marginTop: "12px",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: "auto",
  },
  sortButton: {
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "4px",
  },
  sortIcon: {
    fontSize: "18px",
    color: "#333",
  },
};
