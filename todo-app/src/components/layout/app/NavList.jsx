export default function NavList() {
  return (
    <button style={styles.main}>
      <div style={styles.icon}></div>
      <p style={styles.name}>List Name</p>
      <div style={styles.tasksAmount}>14</div>
    </button>
  );
}

const styles = {
  main: {
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    width: "26px",
    height: "26px",
    border: "2px solid #ccc",
    borderRadius: "8px",
  },
  name: {
    width: "65%",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "start",
  },
  tasksAmount: {
    width: "40px",
    height: "25px",
    borderRadius: "12px",
    backgroundColor: "rgb(240, 240, 240)",
    color: "#333",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
  },
};
