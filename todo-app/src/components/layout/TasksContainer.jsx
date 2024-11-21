/* eslint-disable react/prop-types */

// import NewTaskForm from "../NewTaskForm";
import Task from "./Task";
// import { useTaskForm } from "../../contexts/TaskFormContext";
import { useTaskList } from "../../contexts/TaskListContext";

export default function TasksContainer() {
  // const { isNewTaskFormVisible } = useTaskForm();
  const { updateTaskList, tasks } = useTaskList();

  const deleteTask = (taskId) => {
    const newTaskList = tasks.filter((_, i) => i != taskId);
    updateTaskList(newTaskList);
  };

  const testTask = {
    id: 0,
    name: "Test Task",
    completed: false,
    startTime: "09:00",
    endTime: "23:59",
    note: "Abc",
  };

  const testTwoTask = {
    id: 1,
    name: "Test Task 2",
    completed: false,
    startTime: "13:00",
    endTime: "16:30",
    note: "",
  };

  return (
    <div style={styles.main}>
      {/* <NewTaskForm isVisible={isNewTaskFormVisible} /> */}
      <div style={styles.header}>
        <p style={styles.title}>Tasks for Today</p>
        <a style={styles.link}>View All</a>
      </div>
      <div style={styles.container}>
        <Task task={testTask} />
        <Task task={testTwoTask} />
        <Task task={testTwoTask} />
        <Task task={testTwoTask} />
        <Task task={testTwoTask} />
        <Task task={testTwoTask} />
        <Task task={testTwoTask} />
        <Task task={testTwoTask} />
        <Task task={testTwoTask} />
        {tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            handleDelete={() => deleteTask(index)}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  main: {
    marginTop: "16px",
    width: "40%",
    height: "50%",
    border: "1px solid red",
  },
  container: {
    width: "100%",
    height: "86%",
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
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  link: {
    fontSize: "18px",
    fontWeight: "bold",
    textDecoration: "underline",
    cursor: "pointer",
  },
};
