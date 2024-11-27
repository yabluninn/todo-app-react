/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Task from "./Task";

export default function TasksListContainer({ list }) {
  const testTask = {
    id: 0,
    name: "Test Task",
    completed: false,
    startTime: "09:00",
    endTime: "23:00",
  };
  return (
    <div style={styles.main}>
      <div style={styles.header}>
        <i
          className="hgi-stroke hgi-arrow-down-01"
          style={styles.headerIcon}
        ></i>
        <div
          style={{
            ...styles.icon,
            border: `2px solid ${list.color}`,
          }}
        ></div>
        <p style={styles.listName}>{list.name}</p>
        <div style={styles.tasksCount}>{list.tasks}</div>
      </div>
      <div style={styles.tasks}>
        <Task
          task={testTask}
          handleComplete={() => console.log("Task completed!")}
          handleDelete={() => console.log("Task deleted!")}
        />
        <Task
          task={testTask}
          handleComplete={() => console.log("Task completed!")}
          handleDelete={() => console.log("Task deleted!")}
        />
      </div>
    </div>
  );
}

const styles = {
  main: {
    width: "100%",
    marginTop: "14px",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
  },
  headerIcon: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  icon: {
    width: "20px",
    height: "20px",
    marginRight: "12px",
    marginLeft: "16px",
    border: "2x solid",
    borderRadius: "8px",
  },
  listName: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  tasksCount: {
    fontSize: "14px",
    backgroundColor: "#e6e6e6",
    borderRadius: "16px",
    paddingLeft: "6px",
    paddingRight: "6px",
    color: "#333",
    marginLeft: "12px",
  },
  tasks: {
    marginLeft: "64px",
    marginTop: "12px",
  },
};
