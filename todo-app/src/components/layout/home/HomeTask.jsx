/* eslint-disable react/prop-types */
import { taskService } from "../../../services/TaskService";
import "../../../styles/HomeTask.css";
import { useState, useEffect } from "react";
import { stringExtensions } from "../../../utils/string-extensions";

export default function HomeTask({ task, handleComplete }) {
  const [isCurrentTimeInRange, setIsCurrentTimeInRange] = useState(false);
  const [isOverdue, setOverdue] = useState(false);

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

  const formattedName = stringExtensions.sliceWithDots(task.name, 24);

  return (
    <div
      className={task.completed ? "completed-task" : "container"}
      style={{
        borderLeft: task.completed
          ? "0px"
          : isOverdue
          ? "2px solid rgb(223, 58, 58)"
          : isCurrentTimeInRange
          ? "2px solid #378aff"
          : "0px",
        marginTop: isOverdue ? "4px" : isCurrentTimeInRange ? "4px" : "0px",
        marginBottom: isOverdue ? "4px" : isCurrentTimeInRange ? "4px" : "0px",
        background: task.completed
          ? "#8d8d8d20"
          : isCurrentTimeInRange
          ? "#60a2ff24"
          : "none",
      }}
    >
      <i
        className="fa-solid fa-circle-dot"
        style={{
          ...styles.currentIcon,
          display: isCurrentTimeInRange && !task.completed ? "block" : "none",
        }}
      ></i>
      <i
        className="fa-solid fa-clock"
        style={{
          ...styles.overdueIcon,
          display: isOverdue && !task.completed ? "block" : "none",
        }}
      ></i>
      <div className="checkbox-wrapper-19">
        <input
          type="checkbox"
          id={`cbtest-${task.id}`}
          onChange={handleComplete}
          checked={task.completed}
        />
        <label
          htmlFor={`cbtest-${task.id}`}
          className="check-box"
          style={{
            border: !task.completed
              ? task.priority === "None"
                ? "2px solid #ccc"
                : task.priority === "Low"
                ? "2px solid blue"
                : task.priority === "Medium"
                ? "2px solid orange"
                : task.priority === "High"
                ? "2px solid red"
                : "2px solid #ccc"
              : "",
          }}
        ></label>
      </div>

      <div style={styles.taskBlock}>
        <div style={styles.taskMainBlock}>
          <p
            style={{
              ...styles.taskName,
              textDecoration: task.completed ? "line-through" : "none",
              fontWeight: isCurrentTimeInRange ? "bold" : "normal",
            }}
          >
            {formattedName}
          </p>
          <div style={styles.taskSubBlock}>
            {/* <div
              className={
                task.note == "" ? "invisible-block" : "visible-task-info-block"
              }
              style={{
                background: isCurrentTimeInRange
                  ? "#60a2ff24"
                  : "rgb(248, 248, 248)",
              }}
            >
              <i className="hgi-stroke hgi-sticky-note-02"></i>
            </div> */}
            <div
              style={{
                ...styles.dateBlock,
                background: task.completed
                  ? "transparent"
                  : isCurrentTimeInRange
                  ? "#60a2ff24"
                  : "rgb(248, 248, 248)",
                border: task.completed ? "1px solid #ccc" : "0px",
              }}
            >
              <i
                className="hgi-stroke hgi-clock-01"
                style={styles.dateIcon}
              ></i>
              <p style={styles.dateLabel}>
                {task.startTime + "  -  " + task.endTime}
              </p>
            </div>
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
  currentIcon: {
    color: "#378aff",
    fontSize: "16px",
    marginRight: "12px",
  },
  overdueIcon: {
    color: "rgb(223, 58, 58)",
    fontSize: "16px",
    marginRight: "12px",
  },
};
