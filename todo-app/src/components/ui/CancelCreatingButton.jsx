import { useTaskForm } from "../../contexts/TaskFormContext";

export default function CreateTaskButton() {
  const { toggleNewTaskForm } = useTaskForm();

  return (
    <button
      className="disabled-button"
      style={styles.main}
      onClick={toggleNewTaskForm}
    >
      Cancel
    </button>
  );
}

const styles = {
  main: {
    width: "140px",
    height: "45px",
    fontSize: "18px",
    borderRadius: "8px",
    border: "1px solid #9470ff",
    marginLeft: "12px",
  },
  icon: {
    fontSize: "16px",
    color: "#9470ff",
    marginRight: "10px",
  },
};
