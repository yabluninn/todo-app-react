/* eslint-disable react/prop-types */

import Task from "./Task";

export default function TasksContainer({ taskList }) {
  const taskOne = {
    name: "Task One",
  };
  return (
    <div style={styles.main}>
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
