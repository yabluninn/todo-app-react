export default function HomeNoteWidget() {
  return (
    <div style={styles.main}>
      <i className="hgi-stroke hgi-add-circle" style={styles.icon}></i>
      <p style={styles.label}>Add Widget</p>
    </div>
  );
}

const styles = {
  main: {
    width: "49%",
    height: "55.6%",
    borderRadius: "8px",
    padding: "12px",
    border: "2px dashed #7437ff",
    boxShadow: "rgba(99, 99, 99, 0.05) 0px 2px 12px 0px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  icon: {
    fontSize: "44px",
    color: "#7437ff",
  },
  label: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#7437ff",
    marginTop: "8px",
  },
};
