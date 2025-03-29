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
import "../../../styles/tasks/TasksListContainer.css"

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
    <div className="tlc-main">
      <div
          className="tlc-header"
          style={{borderBottom: isTasksVisible ? "1px solid #eee" : "0", paddingBottom: isTasksVisible ? "8px" : ""}}
      >
        <button onClick={toggleTasksVisibility}>
          <i
              className={`hgi-stroke ${isTasksVisible ? "hgi-arrow-up-01" : "hgi-arrow-down-01"} tlc-header-icon`}
          ></i>
        </button>
        <div className="tlc-color-icon" style={{border: `2px solid ${list.color}`}}></div>
        <p className="tlc-list-name">{list.name}</p>
        <div className="tlc-tasks-count">{list.tasks.length}</div>
        <div className="tlc-actions">
          <button className="tlc-sort-button" onClick={toggleFilterContextMenuVisibility}>
            <i className="hgi-stroke hgi-filter tlc-sort-icon"></i>
          </button>
          <button className="tlc-sort-button" onClick={toggleSortContextMenuVisibility}>
            <i className="hgi-stroke hgi-sort-by-down-02 tlc-sort-icon"></i>
          </button>
        </div>
      </div>
      <div className="tlc-tasks" style={{display: isTasksVisible ? "" : "none"}}>
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
            }}/>
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
