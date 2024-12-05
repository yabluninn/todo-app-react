/* eslint-disable react/prop-types */
import "../../../styles/Note.css";
import { stringExtensions } from "../../../utils/string-extensions";

export default function Note({ note, handleDelete, handleEdit }) {
  const formattedContent = stringExtensions.sliceWithDots(note.content, 80);

  return (
    <div
      className="n-container"
      style={{
        border: "1px solid transparent",
        borderRadius: "0px",
        height: "45px",
        minHeight: "45px",
      }}
    >
      <div style={styles.block}>
        <div style={styles.mainBlock}>
          <div>
            <p style={styles.noteName}>{note.name}</p>
            <p style={styles.noteContent}>{formattedContent}</p>
          </div>
          <div style={styles.subBlock}>
            <button onClick={handleEdit} style={styles.actionButton}>
              <i
                className="hgi-stroke hgi-pencil-edit-01"
                style={styles.actionIcon}
              ></i>
            </button>
            <button onClick={handleDelete} style={styles.actionButton}>
              <i
                className="hgi-stroke hgi-delete-02"
                style={{ ...styles.actionIcon, color: "red" }}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  block: {
    width: "100%",
    marginLeft: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  noteName: {
    fontSize: "16px",
    color: "#333",
  },
  noteContent: {
    fontSize: "14px",
    color: "#aaa",
  },
  mainBlock: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  subBlock: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  actionButton: {
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  actionIcon: {
    fontSize: "20px",
    color: "#333",
  },
  priorityBlock: {
    width: "30px",
    height: "30px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
