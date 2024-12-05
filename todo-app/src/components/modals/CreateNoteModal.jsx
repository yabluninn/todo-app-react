import { createPortal } from "react-dom";
import { useState } from "react";

import InputWithLabel from "../ui/InputWithLabel";
import TextAreaWithLabel from "../ui/TextAreaWithLabel";
import ListDropdown from "../ui/ListDropdown";
import { LIST_TYPES } from "../../constants/list-types";
import { useListsContext } from "../../contexts/ListsContext";

export default function CreateNoteModal({ onClose }) {
  const root = document.getElementById("root");

  // const { addNote, getNotesLength } = useNoteList();
  const { addNoteToList } = useListsContext();

  const [noteName, setNoteName] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const [selectedList, setSelectedList] = useState(-1);

  const handleAddNote = () => {
    if (
      noteName.trim() != "" &&
      noteContent.trim() != "" &&
      selectedList != -1
    ) {
      const currentDate = new Date();

      const newNote = {
        id: Date.now(),
        name: noteName,
        content: noteContent,
        creationDate: currentDate,
      };

      addNoteToList(newNote, selectedList);
      onClose();
    }
  };

  return createPortal(
    <div style={styles.container}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <p style={styles.title}>Create new note</p>
          <button style={styles.closeButton} onClick={onClose}>
            <i
              className="hgi-stroke hgi-cancel-01"
              style={styles.closeIcon}
            ></i>
          </button>
        </div>
        <div style={styles.content}>
          <InputWithLabel
            type="text"
            placeholder="Enter note name"
            label="Name"
            icon="hgi-stroke hgi-text-font"
            value={noteName}
            onChange={(e) => setNoteName(e.target.value)}
          />
          <TextAreaWithLabel
            placeholder="Enter note content"
            label="Content"
            icon="hgi-stroke hgi-text-firstline-left"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            height={"220px"}
          />
          <ListDropdown
            onChange={setSelectedList}
            listType={LIST_TYPES.NOTES_LIST}
          />
        </div>
        <div style={styles.footer}>
          <button style={styles.addButton} onClick={handleAddNote}>
            <i
              className="hgi-stroke hgi-sticky-note-01"
              style={styles.addIcon}
            ></i>
            Create note
          </button>
        </div>
      </div>
    </div>,
    root
  );
}

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    zIndex: 1000,
  },
  modal: {
    position: "relative",
    width: "60%",
    maxWidth: "500px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1001,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #eee",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: 0,
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  closeIcon: {
    fontSize: "20px",
    color: "#888",
  },
  content: {
    padding: "24px",
  },
  footer: {
    padding: "16px 24px",
    borderTop: "1px solid #eee",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  timeInputs: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    gap: "36px",
  },
  addButton: {
    backgroundColor: "#7437ff",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "8px",
    width: "50%",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    color: "white",
    marginRight: "8px",
  },
};
