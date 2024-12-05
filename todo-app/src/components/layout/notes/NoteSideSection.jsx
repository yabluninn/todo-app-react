/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import EditInput from "../../ui/EditInput";
// import EditPriorityDropdown from "../../ui/EditPriorityDropdown";
// import EditTextArea from "../../ui/EditTextArea";
// import { useTaskList } from "../../../contexts/TaskListContext";

export default function NoteSideSection({ note, listName, onClose }) {
  // const { updateTask } = useTaskList();

  const [newName, setNewName] = useState("");

  useEffect(() => {
    setNewName(note.name);
  }, [note.name]);

  const saveNote = () => {
    note.name = newName;

    //updateTask(task);
    onClose();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerSubblock}>
          <i
            className="hgi-stroke hgi-arrow-right-double"
            style={styles.headerIcon}
          ></i>
          <p style={styles.headerListName}>{listName}</p>
        </div>
        <button style={styles.closeButton} onClick={onClose}>
          <i className="hgi-stroke hgi-cancel-01" style={styles.closeIcon}></i>
        </button>
      </div>
      <EditInput
        type="text"
        placeholder="Note name..."
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />

      <button style={styles.saveButton} onClick={saveNote}>
        Save
      </button>
    </div>
  );
}

const styles = {
  container: {
    position: "absolute",
    top: "0",
    right: "0",
    width: "25%",
    height: "100%",
    background: "white",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 8px 16px 0px",
    padding: "18px",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "16px",
  },
  headerIcon: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#aaa",
  },
  headerListName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginLeft: "8px",
  },
  headerSubblock: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
  infoBlock: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: "16px",
    paddingBottom: "16px",
    gap: "8px",
    borderBottom: "1px solid #ccc",
  },
  infoSubBlock: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  infoLabel: {
    fontSize: "14px",
    color: "grey",
    marginTop: "6px",
  },
  saveButton: {
    backgroundColor: "#7437ff",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "8px",
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "43%",
  },
};
