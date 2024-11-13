export default function CreateTaskButton() {
  return (
    <button className="flat-button" style={styles.main}>
      <i className="fa-solid fa-plus" style={styles.icon}></i>
      Create
    </button>
  );
}

const styles = {
  main: {
    width: "280px",
    height: "45px",
    fontSize: "18px",
    borderRadius: "8px",
  },
  icon: {
    fontSize: "16px",
    color: "white",
    marginRight: "10px",
  },
};
