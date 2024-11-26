/* eslint-disable react/prop-types */

import { useNoteList } from "../../../contexts/NoteListContext";
import HomeNote from "./HomeNote";

export default function HomeNoteWidget() {
  const { notes } = useNoteList();

  return (
    <div style={styles.main}>
      <div style={styles.header}>
        <p style={styles.title}>Today&apos;s Notes</p>
        <a style={styles.link}>View All</a>
      </div>
      <div style={styles.container}>
        {notes.map((note) => (
          <HomeNote key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  main: {
    width: "49%",
    height: "315px",
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
    height: "35px",
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
    height: "30px",
    fontSize: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: "#ab99dd",
    marginLeft: "8px",
    border: "1px solid",
    borderRadius: "8px",
    paddingLeft: "8px",
    paddingRight: "8px",
  },
  hintBlock: {
    width: "100%",
    display: "flex",
    borderTop: "1px solid #ccc",
    justifyContent: "space-around",
    paddingTop: "8px",
  },
};
