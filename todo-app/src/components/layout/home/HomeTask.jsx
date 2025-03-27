/* eslint-disable react/prop-types */
import { taskService } from "../../../services/TaskService";
import "../../../styles/home/HomeTask.css";
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
            className="fa-solid fa-circle-dot task-current-icon"
            style={{display: isCurrentTimeInRange && !task.completed ? "block" : "none"}}
        ></i>

        <i
            className="fa-solid fa-clock task-overdue-icon"
            style={{display: isOverdue && !task.completed ? "block" : "none"}}
        ></i>
        <div className="checkbox-wrapper-19">
          <input
              type="checkbox"
              id={`cbtest-${task._id}`}
              onChange={handleComplete}
              checked={task.completed}
          />
          <label
              htmlFor={`cbtest-${task._id}`}
              className="check-box"
              style={{
                border: !task.completed
                    ? task.priority === "none"
                        ? "2px solid #ccc"
                        : task.priority === "low"
                            ? "2px solid blue"
                            : task.priority === "medium"
                                ? "2px solid orange"
                                : task.priority === "high"
                                    ? "2px solid red"
                                    : "2px solid #ccc"
                    : "",
              }}
          ></label>
        </div>

        <div className="task-block">
          <div className="task-main-block">
            <p
                className="task-name"
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  fontWeight: isCurrentTimeInRange ? "bold" : "normal",
                }}
            >
              {formattedName}
            </p>
            <div className="task-sub-block">
              <div
                  className="task-date-block"
                  style={{
                    background: task.completed
                        ? "transparent"
                        : isCurrentTimeInRange
                            ? "#60a2ff24"
                            : "rgb(248, 248, 248)",
                    border: task.completed ? "1px solid #ccc" : "0px",
                  }}
              >
                <i className="hgi-stroke hgi-clock-01 task-date-icon"></i>
                <p className="task-date-label">
                  {task.startTime + "  -  " + task.endTime}
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
      ;
}
