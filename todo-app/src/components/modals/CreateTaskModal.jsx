import { createPortal } from "react-dom";
import { useListsContext } from "../../contexts/ListsContext";
import { useState } from "react";

import InputWithLabel from "../ui/InputWithLabel";
import TextAreaWithLabel from "../ui/TextAreaWithLabel";
import TaskPriorityDropdown from "../ui/TaskPriorityDropdown";
import ListDropdown from "../ui/ListDropdown";
import { LIST_TYPES } from "../../constants/list-types";
import CreateButton from "../ui/CreateButton.jsx";
import SelectRelatedNoteModal from "./SelectRelatedNoteModal.jsx";

export default function CreateTaskModal({ onClose }) {
  const root = document.getElementById("root");
  const { addTaskToList } = useListsContext();

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskStartTime, setTaskStartTime] = useState("");
  const [taskEndTime, setTaskEndTime] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [selectedList, setSelectedList] = useState(-1);
  const [relatedNote, setRelatedNote] = useState(null);
  const [showSelectNoteModal, setShowSelectNoteModal] = useState(false);

  const handleAddTask = () => {
    if (
        taskName.trim() === "" ||
        taskDate.trim() === "" ||
        taskStartTime.trim() === "" ||
        taskEndTime.trim() === "" ||
        selectedList === -1
    ) {
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      date: taskDate,
      startTime: taskStartTime,
      endTime: taskEndTime,
      priority: taskPriority,
      listId: selectedList,
      relatedNoteId: relatedNote?.id || null,
    };

    addTaskToList(newTask, selectedList);
    onClose();
  };

  return createPortal(
      <div style={styles.container}>
        <div style={styles.modal}>
          <div style={styles.header}>
            <p style={styles.title}>Create new task</p>
            <button style={styles.closeButton} onClick={onClose}>
              <i
                  className="hgi-stroke hgi-cancel-01"
                  style={styles.closeIcon}
              ></i>
            </button>
          </div>
          <div style={styles.content}>
            <InputWithLabel
                icon="hgi-stroke hgi-text-font"
                type="text"
                placeholder="Enter task name"
                label="Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <TextAreaWithLabel
                icon="hgi-stroke hgi-text-firstline-left"
                placeholder="Enter task description"
                label="Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
            />
            <div style={styles.timeInputs}>
              <InputWithLabel
                  icon={"hgi-stroke hgi-calendar-01"}
                  type="date"
                  label="Date"
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
              />
              <InputWithLabel
                  icon={"hgi-stroke hgi-clock-03"}
                  type="time"
                  label="From"
                  value={taskStartTime}
                  onChange={(e) => setTaskStartTime(e.target.value)}
              />
              <InputWithLabel
                  icon={"hgi-stroke hgi-clock-02"}
                  type="time"
                  label="To"
                  value={taskEndTime}
                  onChange={(e) => setTaskEndTime(e.target.value)}
              />
            </div>
            <div style={styles.timeInputs}>
              <TaskPriorityDropdown onChange={setTaskPriority} />
              <ListDropdown
                  onChange={setSelectedList}
                  listType={LIST_TYPES.TASK_LIST}
              />
            </div>
            {relatedNote ? (
                <div style={styles.relatedNote}>
                  <p>Related Note: {relatedNote.name}</p>
                  <button
                      style={styles.changeNoteButton}
                      onClick={() => setShowSelectNoteModal(true)}
                  >
                    Change Related Note
                  </button>
                </div>
            ) : (
                <CreateButton
                    title={"Add Related Note"}
                    onClick={() => setShowSelectNoteModal(true)}
                />
            )}
          </div>
          <div style={styles.footer}>
            <button style={styles.addButton} className="add-task-button" onClick={handleAddTask}>
              Create Task
            </button>
          </div>
        </div>
        {showSelectNoteModal && (
            <SelectRelatedNoteModal
                onClose={() => setShowSelectNoteModal(false)}
                onSelect={(note) => {
                  setRelatedNote(note);
                  setShowSelectNoteModal(false);
                }}
            />
        )}
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
  .add-addButton-button:hover {
    background: #5b2db3 !important;
  }
`, styleSheet.cssRules.length);
