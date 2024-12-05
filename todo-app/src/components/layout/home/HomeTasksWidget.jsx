/* eslint-disable react/prop-types */

import HomeTask from "./HomeTask";
import { useState } from "react";
// import { taskActionsService } from "../../../services/TaskActionsService";
// import { SORTING_ACTIONS } from "../../../constants/sorting-actions";
import { useListsContext } from "../../../contexts/ListsContext";
import { Link } from "react-router-dom";
import NothingHere from "../../ui/NothingHere";

export default function HomeTasksWidget() {
  const { getTodayTasks, completeTask } = useListsContext();

  const [isSortContextMenuVisible, setSortContextMenuVisible] = useState(false);

  const toggleSortContextMenuVisibility = () => {
    setSortContextMenuVisible(!isSortContextMenuVisible);
  };

  const tasks = getTodayTasks();

  return (
    <div style={styles.main}>
      <div style={styles.header}>
        <p style={styles.title}>Tasks for Today</p>
        <div style={styles.headerBlock}>
          <button style={styles.sortButton}>
            <i className="hgi-stroke hgi-filter" style={styles.sortIcon}></i>
          </button>
          <button
            style={styles.sortButton}
            onClick={toggleSortContextMenuVisibility}
          >
            <i
              className="hgi-stroke hgi-sort-by-down-02"
              style={styles.sortIcon}
            ></i>
          </button>
          <Link to={"/app/tasks"} style={styles.link}>
            View All
          </Link>
        </div>
      </div>
      {isSortContextMenuVisible && (
        <div style={styles.sortContextMenu}>
          <div style={styles.contextMenuButtons}>
            <button
              style={styles.contextMenuButton}
              onClick={() => {
                // const sortedTasks = taskActionsService.sort(
                //   tasks,
                //   SORTING_ACTIONS.HIGH_PRIORITY_FIRST
                // );
                // updateTaskList(sortedTasks);
              }}
            >
              <i
                className="hgi-stroke hgi-flag-02"
                style={styles.contextMenuButtonIcon}
              ></i>
              Sort by Priority
            </button>
            <button
              style={styles.contextMenuButton}
              onClick={() => {
                // const sortedTasks = taskActionsService.sort(
                //   tasks,
                //   SORTING_ACTIONS.COMPLETED_FIRST
                // );
                // updateTaskList(sortedTasks);
              }}
            >
              <i
                className="hgi-stroke hgi-checkmark-square-02"
                style={styles.contextMenuButtonIcon}
              ></i>
              Sort by Completed
            </button>
            <button
              style={styles.contextMenuButton}
              onClick={() => {
                // const sortedTasks = taskActionsService.sort(
                //   tasks,
                //   SORTING_ACTIONS.UNCOMPLETED_FIRST
                // );
                // updateTaskList(sortedTasks);
              }}
            >
              <i
                className="hgi-stroke hgi-cancel-square"
                style={styles.contextMenuButtonIcon}
              ></i>
              Sort by Uncompleted
            </button>
          </div>
          <button
            style={styles.contextMenuDismissButton}
            onClick={toggleSortContextMenuVisibility}
          >
            Dismiss
          </button>
        </div>
      )}
      <div style={styles.container}>
        {tasks.length === 0 && (
          <NothingHere icon={"fa-solid fa-clipboard-list"} />
        )}
        {tasks.length > 0 &&
          tasks.map((task) => (
            <HomeTask
              key={task.id}
              task={task}
              handleComplete={() => {
                completeTask(task.id, task.listId);
              }}
              // handleDelete={() => removeTask(task.id)}
            />
          ))}
      </div>
      <div style={styles.hintBlock}>
        <div className="home-hint">
          <i
            className="fa-solid fa-circle-dot"
            style={{ color: "#378aff", marginRight: "8px" }}
          ></i>
          <p>Current task</p>
        </div>
        <div className="home-hint">
          <i
            className="fa-solid fa-clock"
            style={{ color: "rgb(223, 58, 58)", marginRight: "8px" }}
          ></i>
          <p>Overdue task</p>
        </div>
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
    height: "220px",
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    flexDirection: "column",
    overflowY: "auto",
    scrollbarWidth: "none",
  },
  header: {
    width: "100%",
    height: "35px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "8px",
    paddingBottom: "4px",
    borderBottom: "1px solid #eee",
  },
  headerBlock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  sortButton: {
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "4px",
  },
  sortIcon: {
    fontSize: "18px",
    color: "#333",
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
    textDecoration: "none",
  },
  hintBlock: {
    width: "100%",
    display: "flex",
    borderTop: "1px solid #eee",
    justifyContent: "space-around",
    paddingTop: "8px",
  },
  sortContextMenu: {
    position: "absolute",
    top: "160px",
    left: "460px",
    backgroundColor: "white",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    zIndex: "1000",
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    padding: "10px",
  },
  contextMenuButtons: {
    width: "100%",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "column",
    borderBottom: "1px solid #c8c8c8",
    paddingBottom: "8px",
  },
  contextMenuButton: {
    width: "190px",
    height: "35px",
    paddingLeft: "8px",
    color: "#333",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    borderRadius: "8px",
  },
  contextMenuButtonIcon: {
    marginRight: "12px",
  },
  contextMenuDismissButton: {
    color: "#6b6b6b !important",
    backgroundColor: "#efefef",
    marginTop: "8px",
    padding: "4px",
    fontSize: "14px",
    justifyContent: "center !important",
    borderRadius: "8px",
  },
};
