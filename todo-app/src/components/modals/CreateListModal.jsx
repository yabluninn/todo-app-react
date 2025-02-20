import { createPortal } from "react-dom";
import { useState } from "react";

import InputWithLabel from "../ui/InputWithLabel";
import { LIST_TYPES } from "../../constants/list-types";
import { useListsContext } from "../../contexts/ListsContext";

export default function CreateListModal({ listType, onClose }) {
  const root = document.getElementById("root");

  const { addTaskList, getTaskListsLength, addNoteList, getNoteListsLength } =
      useListsContext();

  const [listName, setListName] = useState("");
  const [listColor, setListColor] = useState("");

  const handleAddList = () => {
    if (listName.trim() !== "" && listColor.trim() !== "") {
      if (listType === LIST_TYPES.TASK_LIST) {
        const id = getTaskListsLength();
        const newList = {
          id: id,
          name: listName,
          color: listColor,
          tasks: [],
        };
        addTaskList(newList);
      } else if (listType === LIST_TYPES.NOTES_LIST) {
        const id = getNoteListsLength();
        const newList = {
          id: id,
          name: listName,
          color: listColor,
          notes: [],
        };
        addNoteList(newList);
      }

      onClose();
    }
  };

  return createPortal(
      <div style={styles.container}>
        <div style={styles.modal}>
          <div style={styles.header}>
            <p style={styles.title}>
              {"Create " +
                  (listType === LIST_TYPES.TASK_LIST
                      ? "Task"
                      : listType === LIST_TYPES.NOTES_LIST
                          ? "Notes"
                          : "") +
                  " List"}
            </p>
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
                placeholder="Enter list name"
                label="Name"
                icon="hgi-stroke hgi-text-font"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
            />
            <InputWithLabel
                type="color"
                placeholder="Set list color"
                label="Color"
                icon="hgi-stroke hgi-paint-board"
                value={listColor}
                onChange={(e) => setListColor(e.target.value)}
            />
          </div>
          <div style={styles.footer}>
            <button style={styles.addButton} className="add-list-button" onClick={handleAddList}>
              <i
                  className={
                    listType === LIST_TYPES.TASK_LIST
                        ? "hgi-stroke hgi-task-daily-02"
                        : listType === LIST_TYPES.NOTES_LIST
                            ? "hgi-stroke hgi-sticky-note-02"
                            : ""
                  }
                  style={styles.addIcon}
              ></i>
              Create list
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
    cursor: "pointer",
    transition: "background 0.3s ease-in-out",
  },
  addIcon: {
    color: "white",
    marginRight: "8px",
  },
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  .add-list-button:hover {
    background: #5b2db3 !important;
  }
`, styleSheet.cssRules.length);
