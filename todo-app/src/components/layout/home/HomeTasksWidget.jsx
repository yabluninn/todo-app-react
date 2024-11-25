/* eslint-disable react/prop-types */

// import NewTaskForm from "../NewTaskForm";
import Task from "./HomeTask";
// import { useTaskForm } from "../../contexts/TaskFormContext";
import { useTaskList } from "../../../contexts/TaskListContext";

export default function HomeTasksWidget() {
  const { tasks, removeTask, completeTask } = useTaskList();

  return (
    <div style={styles.main}>
      <div style={styles.header}>
        <p style={styles.title}>Tasks for Today</p>
        <div style={styles.headerBlock}>
          <button style={styles.sortButton}>
            <i className="hgi-stroke hgi-filter" style={styles.sortIcon}></i>
          </button>
          <button style={styles.sortButton}>
            <i
              className="hgi-stroke hgi-sort-by-up-01"
              style={styles.sortIcon}
            ></i>
          </button>
          <a style={styles.link}>View All</a>
        </div>
      </div>
      <div style={styles.container}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            handleComplete={() => completeTask(task.id, !task.completed)}
            handleDelete={() => removeTask(task.id)}
          />
        ))}
      </div>
      <div style={styles.hintBlock}>
        <div className="home-hint">
          <div className="home-hint-ct"></div>
          <p>Current task</p>
        </div>
        <div className="home-hint">
          <div className="home-hint-cct"></div>
          <p>Overdue task</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  main: {
    width: "49%",
    height: "315px",
    borderRadius: "8px",
    backgroundColor: "white",
    padding: "12px",
    boxShadow: "rgba(99, 99, 99, 0.05) 0px 2px 12px 0px",
  },
  container: {
    width: "100%",
    height: "220px",
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    flexDirection: "column",
    overflowY: "auto",
    scrollbarWidth: "none",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "8px",
    paddingBottom: "4px",
    borderBottom: "1px solid #ccc",
  },
  headerBlock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  sortButton: {
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sortIcon: {
    fontSize: "20px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  link: {
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "underline",
    cursor: "pointer",
    color: "#ab99dd",
    marginLeft: "8px",
  },
  hintBlock: {
    width: "100%",
    display: "flex",
    borderTop: "1px solid #ccc",
    justifyContent: "space-around",
    paddingTop: "8px",
  },
};
