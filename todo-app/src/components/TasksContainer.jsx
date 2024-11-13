/* eslint-disable react/prop-types */

import NewTaskForm from "./NewTaskForm";
import Task from "./Task";
import { useTaskForm } from "../contexts/TaskFormContext";

export default function TasksContainer({ taskList }) {
  const { isNewTaskFormVisible } = useTaskForm();

  const taskOne = {
    name: "Task One",
  };
  return (
    <div style={styles.main}>
      <NewTaskForm isVisible={isNewTaskFormVisible} />
      <Task task={taskOne} />
      <Task task={taskOne} />
      <Task task={taskOne} />
    </div>
  );
}

const styles = {
  main: {
    marginTop: "32px",
    paddingLeft: "320px",
    paddingRight: "320px",
    width: "100%",
    height: "80%",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "column",
  },
};
