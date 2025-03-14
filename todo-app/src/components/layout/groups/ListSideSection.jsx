/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import EditInput from "../../ui/EditInput";
import {LIST_TYPES} from "../../../constants/list-types.js";
import {useListsContext} from "../../../contexts/ListsContext.jsx";

export default function ListSideSection({ list, listType, onClose }) {
  const { updateTaskList, updateNoteList } = useListsContext();

  const [newListName, setNewListName] = useState(list.name || "");
  const [newListColor, setNewListColor] = useState(list.color || "#ffffff");

  useEffect(() => {
    setNewListName(list.name || "");
    setNewListColor(list.color || "#ffffff");
  }, [list]);


  const saveList = () => {
    const updatedList = {
      name: newListName,
      color: newListColor
    };

    if (listType === LIST_TYPES.TASK_LIST){
      // update task list
      updateTaskList(list._id, updatedList);

    }
    else if (listType === LIST_TYPES.NOTES_LIST){
      // update note list
      updateNoteList(list._id, updatedList);
    }

    onClose();
  };

  return (
      <div style={styles.container}>
        <div style={styles.contentWrapper}>
          <div style={styles.header}>
            <div style={styles.headerSubblock}>
              <i
                  className="hgi-stroke hgi-arrow-right-double"
                  style={styles.headerIcon}
              ></i>
              <p style={styles.headerListName}>{listType} list</p>
            </div>
            <button style={styles.closeButton} onClick={onClose}>
              <i className="hgi-stroke hgi-cancel-01" style={styles.closeIcon}></i>
            </button>
          </div>
          <div style={styles.inputBlock}>
            <div style={styles.infoSubBlock}>
              <EditInput
                  type="text"
                  placeholder="List name..."
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
              />
              <p style={styles.infoLabel}>Name</p>
            </div>
            <div style={styles.infoSubBlock}>
              <EditInput
                  type="color"
                  placeholder="Set list color"
                  value={newListColor}
                  onChange={(e) => setNewListColor(e.target.value)}
              />
              <p style={styles.infoLabel}>Color</p>
            </div>
          </div>

          <button style={styles.saveButton} onClick={saveList}>
            Save
          </button>
        </div>
      </div>
  );
}

const styles = {
  container: {
    position: "absolute",
    top: "0",
    right: "0",
    width: "30%",
    height: "100vh",
    background: "white",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 8px 16px 0px",
    padding: "18px",
  },
  contentWrapper: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    flexGrow: 1,
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
  inputBlock: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "16px",
    paddingBottom: "16px",
    gap: "24px",
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
    marginTop: "auto",
  },
};
