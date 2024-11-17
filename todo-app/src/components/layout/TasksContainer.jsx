/* eslint-disable react/prop-types */

import NewTaskForm from "../NewTaskForm";
import Task from "../Task";
import { useTaskForm } from "../../contexts/TaskFormContext";
import { useTaskList } from "../../contexts/TaskListContext";

export default function TasksContainer() {
  const { isNewTaskFormVisible } = useTaskForm();
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
    startTime: "09:00",
    endTime: "16:30",
    note: "",
  };

  return (
    <div style={styles.main}>
      <NewTaskForm isVisible={isNewTaskFormVisible} />
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
        <Task key={index} task={task} handleDelete={() => deleteTask(index)} />
      ))}
    </div>
  );
}

const styles = {
  main: {
    marginTop: "16px",
    width: "100%",
    height: "75%",
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    flexDirection: "column",
    overflowY: "auto",
  },
};
