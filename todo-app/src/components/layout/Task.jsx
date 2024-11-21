/* eslint-disable react/prop-types */
import { taskService } from "../../services/TaskService";
import "../../styles/Task.css";
import { useState, useEffect } from "react";

export default function Task({ task, handleDelete }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCurrentTimeInRange, setIsCurrentTimeInRange] = useState(false);
  const [isOverdue, setOverdue] = useState(false);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  const checkTimeInRange = () => {
    setIsCurrentTimeInRange(taskService.checkCurrentTimeInRange(task));
  };

  const checkOverdue = () => {
    setOverdue(taskService.checkOverdue(task));
  };

  useEffect(() => {
    checkTimeInRange();
    const interval = setInterval(checkTimeInRange, 60000);
    return () => clearInterval(interval);
  }, [task.startTime, task.endTime]);

  useEffect(() => {
    checkOverdue();
    const interval = setInterval(checkOverdue, 600000);
    return () => clearInterval(interval);
  }, [task.endTime]);

  return (
    <div
      className={isCompleted ? "completed-task" : "container"}
      style={{
        border: isCompleted
          ? "2px solid transparent"
          : isOverdue
          ? "1px solid rgb(223, 58, 58)"
          : isCurrentTimeInRange
          ? "2px solid rgb(66, 189, 250)"
          : "2px solid transparent",
        height: isCurrentTimeInRange ? "60px" : "",
        minHeight: isCurrentTimeInRange ? "60px" : "",
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
              fontWeight: isCurrentTimeInRange ? "bold" : "normal",
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
              <i className="hgi-stroke hgi-sticky-note-02"></i>
            </div>
            <div style={styles.dateBlock}>
              <i
                className="hgi-stroke hgi-clock-01"
                style={styles.dateIcon}
              ></i>
              <p style={styles.dateLabel}>
                {task.startTime + "  -  " + task.endTime}
              </p>
            </div>
            <button onClick={handleDelete} style={styles.deleteButton}>
              <i
                className="hgi-stroke hgi-pencil-edit-01"
                style={styles.deleteIcon}
              ></i>
            </button>
            <button onClick={handleDelete} style={styles.deleteButton}>
              <i
                className="hgi-stroke hgi-delete-02"
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
    fontSize: "16px",
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
    width: "130px",
    padding: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    background: "rgb(248, 248, 248)",
    borderRadius: "8px",
    marginRight: "8px",
    marginLeft: "8px",
    fontSize: "14px",
  },
  dateIcon: {
    fontSize: "16px",
    color: "rgb(152, 152, 152)",
    marginRight: "12px",
  },
  dateLabel: {
    color: "grey",
  },
  deleteButton: {
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
