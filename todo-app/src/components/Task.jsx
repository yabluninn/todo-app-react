/* eslint-disable react/prop-types */
import "./Task.css";
import { useState } from "react";

export default function Task({ task, handleDelete }) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className={isCompleted ? "completed-task" : "container"}>
      <div className="checkbox-wrapper-12">
        <div className="cbx">
          <input
            id="cbx-12"
            type="checkbox"
            checked={isCompleted}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="cbx-12"></label>
          <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
            <path d="M2 8.36364L6.23077 12L13 2"></path>
          </svg>
        </div>
        {/* Gooey Effect */}
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo-12">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="4"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                result="goo-12"
              />
              <feBlend in="SourceGraphic" in2="goo-12" />
            </filter>
          </defs>
        </svg>
      </div>
      <div style={styles.taskBlock}>
        <p
          style={{
            ...styles.taskName,
            textDecoration: isCompleted ? "line-through" : "none",
          }}
        >
          {task.name + " [" + task.id + "]"}
        </p>
        <button onClick={handleDelete}>
          <i className="fa-regular fa-trash-can" style={styles.deleteIcon}></i>
        </button>
      </div>
    </div>
  );
}

const styles = {
  taskBlock: {
    width: "100%",
    height: "100%",
    // border: "1px solid red",
    marginLeft: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    flexDirection: "row",
  },
  taskName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "rgb(82, 82, 82)",
  },
  deleteIcon: {
    fontSize: "20px",
    color: "#9470ff",
  },
};
