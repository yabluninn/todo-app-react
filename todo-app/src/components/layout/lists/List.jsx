import { LIST_TYPES } from "../../../constants/list-types";

/* eslint-disable react/prop-types */
export default function List({ list, listType }) {
  return (
    <div style={styles.container}>
      <div style={styles.block}>
        <div
          style={{
            ...styles.icon,
            border: `2px solid ${list.color}`,
          }}
        ></div>
        <p>{list.name}</p>
      </div>
      <div style={styles.block}>
        <div style={styles.subBlock}>
          <i
            className={
              listType === LIST_TYPES.TASK_LIST
                ? "hgi-stroke hgi-tick-02"
                : listType === LIST_TYPES.NOTES_LIST
                ? "hgi-stroke hgi-sticky-note-01"
                : ""
            }
            style={styles.subBlockIcon}
          ></i>
          <p>
            {listType === LIST_TYPES.TASK_LIST
              ? list.tasks.length
              : listType === LIST_TYPES.NOTES_LIST
              ? list.notes.length
              : ""}
          </p>
        </div>
        <button onClick={"handleEdit"} style={styles.actionButton}>
          <i
            className="hgi-stroke hgi-pencil-edit-01"
            style={styles.actionIcon}
          ></i>
        </button>
        <button onClick={"handleDelete"} style={styles.actionButton}>
          <i
            className="hgi-stroke hgi-delete-02"
            style={{ ...styles.actionIcon, color: "red" }}
          ></i>
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "45px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  block: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    width: "20px",
    height: "20px",
    marginRight: "12px",
    marginLeft: "16px",
    border: "2x solid",
    borderRadius: "8px",
  },
  subBlock: {
    minWidth: "50px",
    height: "30px",
    background: "#f5f5f5",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: "12px",
    paddingRight: "12px",
    marginRight: "16px",
  },
  subBlockIcon: {
    fontSize: "18px",
    color: "rgb(152, 152, 152)",
    marginRight: "8px",
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
};
