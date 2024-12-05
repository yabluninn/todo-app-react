/* eslint-disable react/prop-types */
export default function NothingHere({ icon }) {
  return (
    <div style={styles.nothing}>
      <i className={icon} style={styles.nothingIcon}></i>
      <p style={styles.nothingLabel}>Nothing here</p>
    </div>
  );
}

const styles = {
  nothing: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    fontSize: "22px",
  },
  nothingLabel: {
    color: "#ccc",
  },
  nothingIcon: {
    color: "#ddd",
    fontSize: "48px",
    marginBottom: "12px",
  },
};