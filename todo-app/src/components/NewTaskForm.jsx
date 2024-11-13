/* eslint-disable react/prop-types */
import CreateButton from "./ui/CreateButton";
import CancelButton from "./ui/CancelCreatingButton";
import { useEffect, useState, useContext } from "react";
import TaskListContext from "../contexts/TaskListContext";

export default function NewTaskForm({ isVisible }) {
  const [inputValue, setInputValue] = useState("");
  const [isFocus, setFocus] = useState(false);
  const { updateTaskList, tasks } = useContext(TaskListContext);

  useEffect(() => {
    if (!isVisible) {
      setInputValue("");
    }
  }, [isVisible]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputFocus = () => {
    setFocus(true);
  };

  const handleInputBlur = () => {
    setFocus(false);
  };

  const handleAddTask = () => {
    if (inputValue.trim()) {
      const newTask = {
        id: tasks.length,
        name: inputValue.trim(),
      };
      updateTaskList([...tasks, newTask]);
      setInputValue("");
    }
  };

  return (
    <div style={{ ...styles.container, display: isVisible ? "flex" : "none" }}>
      <i className="fa-solid fa-plus" style={styles.icon}></i>
      <div style={styles.mainBlock}>
        <input
          placeholder="Task name..."
          style={{
            ...styles.taskNameInput,
            borderColor: isFocus ? "#660fff" : "rgb(206, 206, 206)",
          }}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        ></input>
        <div style={styles.subBlock}>
          <CreateButton onClick={handleAddTask} />
          <CancelButton />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "130px",
    border: "1px solid rgb(206, 206, 206)",
    borderRadius: "14px",
    backgroundColor: "rgb(250, 250, 250)",
    marginTop: "16px",
    display: "flex",
    alignItems: "start",
    padding: "14px",
    position: "relative",
  },
  icon: {
    marginTop: "10px",
    fontSize: "20px",
    color: "rgb(186, 186, 186)",
  },
  mainBlock: {
    width: "100%",
    height: "100%",
    marginLeft: "12px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "column",
  },
  taskNameInput: {
    width: "100%",
    outline: "none",
    border: "1px solid rgb(206, 206, 206)",
    borderRadius: "8px",
    padding: "10px",
    fontSize: "18px",
    backgroundColor: "rgb(245, 245, 245)",
  },
  subBlock: {
    width: "100%",
    marginTop: "10px",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    flexDirection: "row",
  },
};
