import { useTaskForm } from "../../contexts/TaskFormContext";

export default function CreateTaskButton() {
  const { toggleNewTaskForm } = useTaskForm();

  return (
    <button
      className="flat-button"
      style={styles.main}
      onClick={toggleNewTaskForm}
    >
      <i className="fa-solid fa-plus" style={styles.icon}></i>
      New task
    </button>
  );
}

const styles = {
  main: {
    width: "150px",
    height: "45px",
    fontSize: "16px",
    borderRadius: "8px",
  },
  icon: {
    fontSize: "16px",
    color: "white",
    marginRight: "10px",
  },
};
