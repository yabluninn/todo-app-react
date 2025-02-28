/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {useEffect, useState} from "react";
import Task from "./Task";
import { useListsContext } from "../../../contexts/ListsContext";
import ContextMenu from "../../contextMenus/ContextMenu.jsx";
import ContextMenuButton from "../../contextMenus/ContextMenuButton.jsx";
import {SORTING_ACTIONS} from "../../../constants/sorting-actions.js";
import {FILTER_ACTIONS} from "../../../constants/filter-actions.js";
import {taskActionsService} from "../../../services/TaskActionsService.js";

export default function TasksListContainer({ list, onTaskSideOpen }) {
  const [filteredTasks, setFilteredTasks] = useState([...list.tasks]);
  const [currentSorting, setCurrentSorting] = useState(null);
  const [currentFilter, setCurrentFilter] = useState(null);

  const [isTasksVisible, setTasksVisibility] = useState(false);
  const [isSortContextMenuVisible, setSortContextMenuVisible] = useState(false);
  const [isFilterContextMenuVisible, setFilterContextMenuVisible] = useState(false);

  const [sortMenuPosition, setSortMenuPosition] = useState({ top: 0, left: 1185 });
  const [filterMenuPosition, setFilterMenuPosition] = useState({ top: 0, left: 1150 });

  const handleCompleteTask = (taskId, listId) => {
    completeTask(taskId, listId);

    console.log("Task completed: ", taskId, listId);
  };

  useEffect(() => {
    setFilteredTasks(list.tasks);
  }, [list.tasks]);

  useEffect(() => {
    let updatedTasks = [...list.tasks];

    if (currentFilter) {
      updatedTasks = taskActionsService.filter(updatedTasks, currentFilter);
    }

    if (currentSorting) {
      updatedTasks = taskActionsService.sort(updatedTasks, currentSorting);
    }

    setFilteredTasks(updatedTasks);
  }, [list.tasks, currentSorting, currentFilter]);

  const sortListTasks = (sortingAction) => {
    setCurrentSorting(sortingAction);
  };

  const filterListTasks = (filterAction) => {
    setCurrentFilter(filterAction);
  };

  const toggleSortContextMenuVisibility = (event) => {
    setSortMenuPosition({
      top: window.scrollY + event.clientY  + 25,
      left: 1185
    });
    setSortContextMenuVisible(!isSortContextMenuVisible);
    setFilterContextMenuVisible(false);
  };

  const toggleFilterContextMenuVisibility = (event) => {
    setFilterMenuPosition({
      top: window.scrollY + event.clientY + 25,
      left: 1150
    });
    setFilterContextMenuVisible(!isFilterContextMenuVisible);
    setSortContextMenuVisible(false);
  };



  const { removeTask, completeTask } = useListsContext();

  const toggleTasksVisibility = () => setTasksVisibility(!isTasksVisible);

  return (
    <div style={styles.main}>
      <i
        className="hgi-stroke hgi-task-daily-02"
        style={{
          position: "absolute",
          color: "#bbb",
          marginLeft: "-50px",
          fontSize: "20px",
        }}
      ></i>
      <div
        style={{
          ...styles.header,
          borderBottom: isTasksVisible ? "1px solid #eee" : "0",
          paddingBottom: isTasksVisible ? "8px" : "",
        }}
      >
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={toggleTasksVisibility}
        >
          <i
            className={
              isTasksVisible
                ? "hgi-stroke hgi-arrow-up-01"
                : "hgi-stroke hgi-arrow-down-01"
            }
            style={styles.headerIcon}
          ></i>
        </button>
        <div
          style={{
            ...styles.icon,
            border: `2px solid ${list.color}`,
          }}
        ></div>
        <p style={styles.listName}>{list.name}</p>
        <div style={styles.tasksCount}>{list.tasks.length}</div>
        <div style={styles.actions}>
          <button style={styles.sortButton} onClick={toggleFilterContextMenuVisibility}>
            <i className="hgi-stroke hgi-filter" style={styles.sortIcon}></i>
          </button>
          <button style={styles.sortButton} onClick={toggleSortContextMenuVisibility}>
            <i
              className="hgi-stroke hgi-sort-by-down-02"
              style={styles.sortIcon}
            ></i>
          </button>
        </div>
      </div>
      <div style={{ ...styles.tasks, display: isTasksVisible ? "" : "none" }}>
        {filteredTasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            handleEdit={() => {
              onTaskSideOpen(task);
            }}
            handleComplete={() => handleCompleteTask(task._id, list._id)}
            handleDelete={() => removeTask(task._id, list._id)}
          />
        ))}
      </div>
      {isSortContextMenuVisible && (
          <ContextMenu position={sortMenuPosition} toggleVisibility={toggleSortContextMenuVisibility}>
            <ContextMenuButton title={"Sort by Priority"} icon={"hgi-stroke hgi-flag-02"} onClick={() => {
              sortListTasks(SORTING_ACTIONS.HIGH_PRIORITY_FIRST)
            }} />
            <ContextMenuButton title={"Sort by Completed"} icon={"hgi-stroke hgi-checkmark-square-02"} onClick={() => {
              sortListTasks(SORTING_ACTIONS.COMPLETED_FIRST)
            }}/>
            <ContextMenuButton title={"Sort by Uncompleted"} icon={"hgi-stroke hgi-cancel-square"} onClick={() => {
              sortListTasks(SORTING_ACTIONS.UNCOMPLETED_FIRST)
            }}/>
          </ContextMenu>)}
      {isFilterContextMenuVisible && (
          <ContextMenu position={filterMenuPosition} toggleVisibility={toggleFilterContextMenuVisibility}>
            <ContextMenuButton title={"Show Completed"} icon={"hgi-stroke hgi-checkmark-square-02"} onClick={() => {
              filterListTasks(FILTER_ACTIONS.SHOW_COMPLETED)
            }} />
            <ContextMenuButton title={"Show Uncompleted"} icon={"hgi-stroke hgi-cancel-square"} onClick={() => {
              filterListTasks(FILTER_ACTIONS.SHOW_UNCOMPLETED)
            }}/>
            <ContextMenuButton title={"Show Overdue"} icon={"hgi-stroke hgi-clock-04"} onClick={() => {
              filterListTasks(FILTER_ACTIONS.SHOW_OVERDUE)
            }}/>
          </ContextMenu>)}
    </div>
  );
}

const styles = {
  main: {
    width: "100%",
    marginTop: "14px",
    backgroundColor: "white",
    padding: "12px",
    borderRadius: "8px",
    boxShadow: "rgba(99, 99, 99, 0.05) 0px 2px 12px 0px",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
    borderBottom: "1px solid #eee",
    paddingBottom: "8px",
  },
  headerIcon: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  icon: {
    width: "20px",
    height: "20px",
    marginRight: "12px",
    marginLeft: "16px",
    border: "2x solid",
    borderRadius: "8px",
  },
  listName: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  tasksCount: {
    fontSize: "14px",
    backgroundColor: "#e6e6e6",
    borderRadius: "16px",
    paddingLeft: "6px",
    paddingRight: "6px",
    color: "#333",
    marginLeft: "12px",
  },
  tasks: {
    marginLeft: "64px",
    marginTop: "12px",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: "auto",
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
};
