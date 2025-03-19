/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import EditInput from "../../ui/EditInput";
import EditPriorityDropdown from "../../ui/EditPriorityDropdown";
import EditTextArea from "../../ui/EditTextArea";
import { useListsContext } from "../../../contexts/ListsContext";
import SelectRelatedNoteModal from "../../modals/SelectRelatedNoteModal.jsx";

export default function TaskSideSection({ task, onClose }) {
  const { getTaskListById, updateTask, getNoteById } = useListsContext();

  const [newTaskName, setNewTaskName] = useState(task.name || "");
  const [newStartTime, setNewStartTime] = useState(task.startTime || "");
  const [newEndTime, setNewEndTime] = useState(task.endTime || "");
  const [newTaskDate, setNewTaskDate] = useState(task.date || "");
  const [newTaskPriority, setNewTaskPriority] = useState(task.priority || "none");
  const [newTaskDescription, setNewTaskDescription] = useState(task.description || "");
  const [relatedNoteId, setRelatedNoteId] = useState(task.relatedNoteId || null);
  const [relatedNote, setRelatedNote] = useState(null);
  const [showSelectNoteModal, setShowSelectNoteModal] = useState(false);

  useEffect(() => {
    setNewTaskName(task.name || "");
    setNewStartTime(task.startTime || "");
    setNewEndTime(task.endTime || "");
    setNewTaskPriority(task.priority || "none");
    setNewTaskDescription(task.description || "");
    setRelatedNoteId(task.relatedNoteId || null);

    if (task.date) {
      const formattedDate = new Date(task.date).toISOString().split("T")[0];
      setNewTaskDate(formattedDate);
    } else {
      setNewTaskDate("");
    }

    if (task.relatedNoteId) {
      const note = getNoteById(task.relatedNoteId);
      setRelatedNote(note || null);
    } else {
      setRelatedNote(null);
    }
  }, [task, getNoteById]);


  const saveTask = () => {
    const formattedDate = newTaskDate
        ? new Date(newTaskDate).toISOString().split("T")[0]
        : "";

    const updatedTask = {
      name: newTaskName,
      startTime: newStartTime,
      endTime: newEndTime,
      date: formattedDate,
      priority: newTaskPriority,
      description: newTaskDescription,
      listId: task.listId,
      completed: task.completed ?? false,
      relatedNoteId: relatedNoteId,
    };

    console.log("🔹 Данные перед отправкой в updateTask:", updatedTask);

    updateTask(task._id, updatedTask);
    onClose();
  };

  const handleRemoveRelatedNote = () => {
    setRelatedNoteId(null);
    setRelatedNote(null);
  };

  const list = getTaskListById(task.listId);
  const listName = list ? list.name : "Unknown List";

  return (
      <div style={styles.container}>
        <div style={styles.contentWrapper}>
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
              placeholder="Task name..."
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
          />
          <div style={styles.infoBlock}>
            <div style={styles.infoSubBlock}>
              <EditInput
                  type="time"
                  placeholder=""
                  value={newStartTime}
                  onChange={(e) => setNewStartTime(e.target.value)}
                  width={"100%"}
              />
              <p style={styles.infoLabel}>Start time</p>
            </div>
            <div style={styles.infoSubBlock}>
              <EditInput
                  type="time"
                  placeholder=""
                  value={newEndTime}
                  onChange={(e) => setNewEndTime(e.target.value)}
                  width={"100%"}
              />
              <p style={styles.infoLabel}>Due time</p>
            </div>
            <div style={styles.infoSubBlock}>
              <EditInput
                  type="date"
                  placeholder=""
                  value={newTaskDate}
                  onChange={(e) => setNewTaskDate(e.target.value)}
                  width={"100%"}
              />
              <p style={styles.infoLabel}>Due date</p>
            </div>
          </div>
          <div style={styles.infoBlock}>
            <div style={styles.infoSubBlock}>
              <EditPriorityDropdown
                  onChange={setNewTaskPriority}
                  width={"100%"}
                  defaultValue={task.priority}
              />
              <p style={styles.infoLabel}>Priority</p>
            </div>
          </div>
          <div style={styles.infoSubBlock}>
            <EditTextArea
                placeholder={"Task description..."}
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <p style={styles.infoLabel}>Description</p>
          </div>
          <div style={styles.infoBlock}>
            <div style={styles.infoSubBlock}>
              {relatedNote ? (
                  <div style={styles.relatedNote}>
                    <p>{relatedNote.name}</p>
                    <button style={styles.removeNoteButton} onClick={handleRemoveRelatedNote}>
                      Remove
                    </button>
                  </div>
              ) : (
                  <button style={styles.addNoteButton} onClick={() => setShowSelectNoteModal(true)}>
                    + Add Related Note
                  </button>
              )}
              <p style={styles.infoLabel}>Related Note</p>
            </div>
          </div>
          <button style={styles.saveButton} onClick={saveTask}>
            Save
          </button>
        </div>
        {showSelectNoteModal && (
            <SelectRelatedNoteModal
                onClose={() => setShowSelectNoteModal(false)}
                onSelect={(note) => {
                  setRelatedNoteId(note._id);
                  setRelatedNote(note);
                  setShowSelectNoteModal(false);
                }}
            />
        )}
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
    marginTop: "auto",
  },
  relatedNote: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  addNoteButton: {
    backgroundColor: "#7437ff",
    color: "white",
    borderRadius: "4px",
    padding: "8px",
    cursor: "pointer",
  },
  removeNoteButton: {
    backgroundColor: "#ff4747",
    color: "white",
    borderRadius: "4px",
    padding: "8px",
    cursor: "pointer",
  },
};
