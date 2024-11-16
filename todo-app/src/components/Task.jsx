/* eslint-disable react/prop-types */
import "./Task.css";
import { useState, useEffect } from "react";

export default function Task({ task, handleDelete }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCurrentTimeInRange, setIsCurrentTimeInRange] = useState(false);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  const checkCurrentTimeInRange = () => {
    const nowTime = new Date();
    const currentTime = nowTime.getHours() * 60 + nowTime.getMinutes();

    const [startHours, startMinutes] = task.startTime.split(":").map(Number);
    const [endHours, endMinutes] = task.endTime.split(":").map(Number);

    const taskStartTime = startHours * 60 + startMinutes;
    const taskEndTime = endHours * 60 + endMinutes;

    setIsCurrentTimeInRange(
      currentTime >= taskStartTime && currentTime <= taskEndTime
    );
  };

  useEffect(() => {
    checkCurrentTimeInRange();
    const interval = setInterval(checkCurrentTimeInRange, 60000);
    return () => clearInterval(interval);
  }, [task.startTime, task.endTime]);

  return (
    <div
      className={isCompleted ? "completed-task" : "container"}
      style={{
        border: isCurrentTimeInRange ? "2px solid rgb(66, 189, 250)" : "none",
        height: isCurrentTimeInRange ? "80px" : "",
        minHeight: isCurrentTimeInRange ? "80px" : "",
      }}
    >
      <div className="checkbox-wrapper-19">
        <input type="checkbox" id="cbtest-19" onChange={handleCheckboxChange} />
        <label htmlFor="cbtest-19" className="check-box"></label>
      </div>

      <div style={styles.taskBlock}>
        <div style={styles.taskMainBlock}>
          <p
            style={{
              ...styles.taskName,
              textDecoration: isCompleted ? "line-through" : "none",
            }}
          >
            {task.name + " [" + task.id + "]"}
          </p>
          <div style={styles.taskSubBlock}>
            <div
              className={
                task.note == "" ? "invisible-block" : "visible-task-info-block"
              }
            >
              <i className="fa-regular fa-note-sticky"></i>
            </div>
            <div style={styles.dateBlock}>
              <i className="fa-regular fa-clock" style={styles.dateIcon}></i>
              <p style={styles.dateLabel}>
                {task.startTime + "  -  " + task.endTime}
              </p>
            </div>
            <button onClick={handleDelete} style={styles.deleteButton}>
              <i
                className="fa-regular fa-pen-to-square"
                style={styles.deleteIcon}
              ></i>
            </button>
            <button onClick={handleDelete} style={styles.deleteButton}>
              <i
                className="fa-regular fa-trash-can"
                style={styles.deleteIcon}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  taskBlock: {
    width: "100%",
    marginLeft: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  taskName: {
    fontSize: "18px",
    color: "#333",
  },
  deleteIcon: {
    fontSize: "20px",
    color: "#333",
  },
  taskMainBlock: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  taskSubBlock: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  dateBlock: {
    width: "160px",
    padding: "6px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    background: "rgb(238, 238, 238)",
    borderRadius: "8px",
    marginRight: "16px",
    marginLeft: "16px",
  },
  dateIcon: {
    fontSize: "18px",
    color: "rgb(152, 152, 152)",
    marginRight: "12px",
  },
  dateLabel: {
    color: "grey",
  },
  deleteButton: {
    width: "33.6px",
    height: "33.6px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
