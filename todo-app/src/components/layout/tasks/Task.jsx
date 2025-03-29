import "../../../styles/Task.css";
import { dateExtensions } from "../../../utils/date-extensions";

export default function Task({
                               task,
                               handleDelete,
                               handleComplete,
                               handleEdit,
                             }) {
  const formattedDate = dateExtensions.formatDate(task.date);

  return (
      <div
          className={
            task.completed ? "completed-task" : "t-container"
          }
      >
        <div className="checkbox-wrapper-19">
          <input
              type="checkbox"
              id={`cbtest-${task._id}`}
              onChange={handleComplete}
              checked={task.completed}
          />
          <label htmlFor={`cbtest-${task._id}`} className="check-box"></label>
        </div>

        <div className="task-block">
          <div className="task-main-block">
            <p
                className={`task-name ${task.completed ? "completed" : ""}`}
            >
              {task.name}
            </p>
            <div className="task-sub-block">
              <div className="priority-block">
                <i
                    className="fa-solid fa-flag"
                    style={{
                      color:
                          task.priority === "none"
                              ? "#ccc"
                              : task.priority === "low"
                                  ? "blue"
                                  : task.priority === "medium"
                                      ? "orange"
                                      : task.priority === "high"
                                          ? "red"
                                          : "#ccc",
                    }}
                ></i>
              </div>
              <div
                  className={
                    task.relatedNoteId == null
                        ? "invisible-block"
                        : "visible-task-info-block"
                  }
              >
                <i className="hgi-stroke hgi-sticky-note-02"></i>
              </div>
              <div className="date-block">
                <i className="hgi-stroke hgi-clock-01 date-icon"></i>
                <p className="date-label">
                  {task.startTime + "  -  " + task.endTime}
                </p>
              </div>
              <div className="date-block">
                <i className="hgi-stroke hgi-calendar-03 date-icon"></i>
                <p className="date-label">{formattedDate}</p>
              </div>
              <button onClick={handleEdit} className="action-button">
                <i className="hgi-stroke hgi-pencil-edit-01 action-icon"></i>
              </button>
              <button onClick={handleDelete} className="action-button">
                <i className="hgi-stroke hgi-delete-02 action-icon delete"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
