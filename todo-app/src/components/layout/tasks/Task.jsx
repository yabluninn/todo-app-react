/* eslint-disable react/prop-types */
import "../../../styles/Task.css";

export default function Task({ task, handleDelete, handleComplete }) {
  return (
    <div
      className={task.completed ? "completed-task" : "container"}
      style={{
        border: "1px solid transparent",
        borderRadius: "0px",
        height: "45px",
        minHeight: "45px",
      }}
    >
      <div className="checkbox-wrapper-19">
        <input
          type="checkbox"
          id={`cbtest-${task.id}`}
          onChange={handleComplete}
        />
        <label htmlFor={`cbtest-${task.id}`} className="check-box"></label>
      </div>

      <div style={styles.taskBlock}>
        <div style={styles.taskMainBlock}>
          <p
            style={{
              ...styles.taskName,
              textDecoration: task.completed ? "line-through" : "none",
              fontWeight: "normal",
            }}
          >
            {task.name + " [" + task.id + "]"}
          </p>
          <div style={styles.taskSubBlock}>
            <div style={styles.priorityBlock}>
              <i
                className="fa-solid fa-flag"
                style={{
                  color:
                    task.priority === "None"
                      ? "#ccc"
                      : task.priority === "Low"
                      ? "blue"
                      : task.priority === "Medium"
                      ? "orange"
                      : task.priority === "High"
                      ? "red"
                      : "#ccc",
                }}
              ></i>
            </div>
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
            <div style={styles.dateBlock}>
              <i
                className="hgi-stroke hgi-calendar-03"
                style={styles.dateIcon}
              ></i>
              <p style={styles.dateLabel}>{task.date}</p>
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
    height: "30px",
    padding: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    background: "#f5f5f5",
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
  priorityBlock: {
    width: "30px",
    height: "30px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
