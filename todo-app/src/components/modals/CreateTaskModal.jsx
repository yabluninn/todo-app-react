import { createPortal } from "react-dom";
import InputWithLabel from "../ui/InputWithLabel";
import TextAreaWithLabel from "../ui/TextAreaWithLabel";
import { useTaskList } from "../../contexts/TaskListContext";
import { useState } from "react";

export default function CreateTaskModal({ onClose }) {
  const root = document.getElementById("root");

  const { addTask, getTasksLength } = useTaskList();

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskStartTime, setTaskStartTime] = useState("");
  const [taskEndTime, setTaskEndTime] = useState("");

  const handleAddTask = () => {
    const id = getTasksLength();
    const newTask = {
      id: id,
      name: taskName,
      description: taskDescription,
      date: taskDate,
      startTime: taskStartTime,
      endTime: taskEndTime,
    };
    addTask(newTask);
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
            type="text"
            placeholder="Enter task name"
            label="Name"
            icon="hgi-stroke hgi-text-font"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <TextAreaWithLabel
            placeholder="Enter task description"
            label="Description (Optional)"
            icon="hgi-stroke hgi-text-firstline-left"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <InputWithLabel
            type="date"
            placeholder=""
            label="Date"
            icon="hgi-stroke hgi-calendar-01"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
          />
          <div style={styles.timeInputs}>
            <InputWithLabel
              type="time"
              placeholder=""
              label="Start Time"
              icon="hgi-stroke hgi-calendar-01"
              value={taskStartTime}
              onChange={(e) => setTaskStartTime(e.target.value)}
            />
            <InputWithLabel
              type="time"
              placeholder=""
              label="End Time"
              icon="hgi-stroke hgi-calendar-01"
              value={taskEndTime}
              onChange={(e) => setTaskEndTime(e.target.value)}
            />
          </div>
        </div>
        <div style={styles.footer}>
          <button style={styles.addButton} onClick={handleAddTask}>
            <i
              className="hgi-stroke hgi-task-add-01"
              style={styles.addIcon}
            ></i>
            Create task
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
    borderRadius: "8px",
    width: "50%",
    height: "45px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    color: "white",
    marginRight: "8px",
  },
};
