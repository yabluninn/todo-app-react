/* eslint-disable react/prop-types */

import HomeTask from "./HomeTask";
import {useEffect, useState} from "react";
import {useListsContext} from "../../../contexts/ListsContext";
import {Link} from "react-router-dom";
import NothingHere from "../../ui/NothingHere";
import ContextMenu from "../../contextMenus/ContextMenu.jsx";
import ContextMenuButton from "../../contextMenus/ContextMenuButton.jsx";
import {taskActionsService} from "../../../services/TaskActionsService.js";
import {SORTING_ACTIONS} from "../../../constants/sorting-actions.js";
import {FILTER_ACTIONS} from "../../../constants/filter-actions.js";

export default function HomeTasksWidget() {
  const [todayTasks, setTodayTasks] = useState([]);
  const [originalTasks, setOriginalTasks] = useState([]);
  const { getTodayTasks, completeTask } = useListsContext();

  const [isSortContextMenuVisible, setSortContextMenuVisible] = useState(false);
  const [isFilterContextMenuVisible, setFilterContextMenuVisible] = useState(false);

  const toggleSortContextMenuVisibility = () => {
    setSortContextMenuVisible(!isSortContextMenuVisible);
    setFilterContextMenuVisible(false);
  };
  const toggleFilterContextMenuVisibility = () => {
    setFilterContextMenuVisible(!isFilterContextMenuVisible);
    setSortContextMenuVisible(false);
  }

  useEffect(() => {
    const tasks = getTodayTasks();
    setTodayTasks(tasks);
    setOriginalTasks(tasks);
  }, [getTodayTasks]);

  const sortTodayTasks = (action) => {
    const sortedTasks = taskActionsService.sort([...originalTasks], action);
    setTodayTasks(sortedTasks);
  };

  const filterTodayTasks = (action) => {
    const filteredTasks = taskActionsService.filter([...originalTasks], action);
    setTodayTasks(filteredTasks);
  };

  return (
    <div style={styles.main}>
      <div style={styles.header}>
        <p style={styles.title}>Tasks for Today</p>
        <div style={styles.headerBlock}>
          <button
              style={styles.sortButton}
              onClick={toggleFilterContextMenuVisibility}
          >
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
          <ContextMenu position={{top: "160px", left: "410px"}} toggleVisibility={toggleSortContextMenuVisibility}>
            <ContextMenuButton title={"Sort by Priority"} icon={"hgi-stroke hgi-flag-02"} onClick={() => {
              sortTodayTasks(SORTING_ACTIONS.HIGH_PRIORITY_FIRST)
            }} />
            <ContextMenuButton title={"Sort by Completed"} icon={"hgi-stroke hgi-checkmark-square-02"} onClick={() => {
              sortTodayTasks(SORTING_ACTIONS.COMPLETED_FIRST)
            }}/>
            <ContextMenuButton title={"Sort by Uncompleted"} icon={"hgi-stroke hgi-cancel-square"} onClick={() => {
              sortTodayTasks(SORTING_ACTIONS.UNCOMPLETED_FIRST)
            }}/>
           </ContextMenu>
      )}
      {isFilterContextMenuVisible && (
          <ContextMenu position={{top: "160px", left: "375px"}} toggleVisibility={toggleFilterContextMenuVisibility}>
            <ContextMenuButton title={"Show Completed"} icon={"hgi-stroke hgi-checkmark-square-02"} onClick={() => {
              filterTodayTasks(FILTER_ACTIONS.SHOW_COMPLETED)
            }} />
            <ContextMenuButton title={"Show Uncompleted"} icon={"hgi-stroke hgi-cancel-square"} onClick={() => {
              filterTodayTasks(FILTER_ACTIONS.SHOW_UNCOMPLETED)
            }}/>
            <ContextMenuButton title={"Show Overdue"} icon={"hgi-stroke hgi-clock-04"} onClick={() => {
              filterTodayTasks(FILTER_ACTIONS.SHOW_OVERDUE)
            }}/>
          </ContextMenu>
      )}
      <div style={styles.container}>
        {todayTasks.length === 0 && (
          <NothingHere icon={"fa-solid fa-clipboard-list"} />
        )}
        {todayTasks.length > 0 &&
            todayTasks.map((task) => (
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
};
