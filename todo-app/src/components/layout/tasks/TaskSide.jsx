/* eslint-disable react/prop-types */
import "../../../styles/TaskSide.css";

export default function TaskSide({ task, handleComplete }) {
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
            }}
          >
            {task.name}
          </p>
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
    fontSize: "20px",
    fontWeight: "bold",
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
};
