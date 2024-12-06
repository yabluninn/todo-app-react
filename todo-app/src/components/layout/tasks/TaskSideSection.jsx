/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import EditInput from "../../ui/EditInput";
import EditPriorityDropdown from "../../ui/EditPriorityDropdown";
import EditTextArea from "../../ui/EditTextArea";
import { useTaskList } from "../../../contexts/TaskListContext";
import { useListsContext } from "../../../contexts/ListsContext";

export default function TaskSideSection({ task, onClose }) {
  const { updateTask } = useTaskList();

  const { getTaskListById } = useListsContext();

  const [newTaskName, setNewTaskName] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  useEffect(() => {
    setNewTaskName(task.name);
  }, [task.name]);
  useEffect(() => {
    setNewStartTime(task.startTime);
  }, [task.startTime]);
  useEffect(() => {
    setNewEndTime(task.endTime);
  }, [task.endTime]);
  useEffect(() => {
    setNewTaskDate(task.date);
  }, [task.date]);
  useEffect(() => {
    setNewTaskPriority(task.priority);
  }, [task.priority]);
  useEffect(() => {
    setNewTaskDescription(task.description);
  }, [task.description]);

  const saveTask = () => {
    task.name = newTaskName;
    task.startTime = newStartTime;
    task.endTime = newEndTime;
    task.date = newTaskDate;
    task.priority = newTaskPriority;
    task.description = newTaskDescription;

    updateTask(task);
    onClose();
  };

  const listName = getTaskListById(task.listId).name;

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
      <button style={styles.saveButton} onClick={saveTask}>
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
