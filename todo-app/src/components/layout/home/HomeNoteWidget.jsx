/* eslint-disable react/prop-types */

import HomeNote from "./HomeNote";

export default function HomeNoteWidget() {
  const noteOne = {
    name: "Test Note",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime explicabo officiis a atque laudantium consequatur nesciunt corporis vitae consectetur. Quaerat soluta rem odio laborum consequatur ea?",
  };

  return (
    <div style={styles.main}>
      {/* <NewTaskForm isVisible={isNewTaskFormVisible} /> */}
      <div style={styles.header}>
        <p style={styles.title}>Today&apos;s Notes</p>
        <a style={styles.link}>View All</a>
      </div>
      <div style={styles.container}>
        <HomeNote note={noteOne} />
        <HomeNote note={noteOne} />
        <HomeNote note={noteOne} />
        <HomeNote note={noteOne} />
        <HomeNote note={noteOne} />
      </div>
    </div>
  );
}

const styles = {
  main: {
    width: "49%",
    height: "55.6%",
    borderRadius: "8px",
    backgroundColor: "white",
    padding: "12px",
    boxShadow: "rgba(99, 99, 99, 0.05) 0px 2px 12px 0px",
  },
  container: {
    width: "100%",
    height: "250px",
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    flexDirection: "row",
    flexWrap: "wrap",
    overflowY: "auto",
    scrollbarWidth: "none",
    gap: "12px",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "8px",
    paddingBottom: "8px",
    borderBottom: "1px solid #ccc",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  link: {
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "underline",
    cursor: "pointer",
    color: "#ab99dd",
  },
  hintBlock: {
    width: "100%",
    display: "flex",
    borderTop: "1px solid #ccc",
    justifyContent: "space-around",
    paddingTop: "8px",
  },
};
