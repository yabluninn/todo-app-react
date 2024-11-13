/* eslint-disable react/prop-types */

import NewTaskForm from "./NewTaskForm";
import Task from "./Task";
import { useTaskForm } from "../contexts/TaskFormContext";
import { useTaskList } from "../contexts/TaskListContext";

export default function TasksContainer() {
  const { isNewTaskFormVisible } = useTaskForm();
  const { updateTaskList, tasks } = useTaskList();

  const deleteTask = (taskId) => {
    const newTaskList = tasks.filter((_, i) => i != taskId);
    updateTaskList(newTaskList);
  };

  return (
    <div style={styles.main}>
      <NewTaskForm isVisible={isNewTaskFormVisible} />
      {tasks.map((task, index) => (
        <Task key={index} task={task} handleDelete={() => deleteTask(index)} />
      ))}
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
