/* eslint-disable react/prop-types */

import "../../../styles/home/widgets/HomeTasksWidget.css";
import HomeTask from "./HomeTask";
import { useEffect, useState } from "react";
import { useListsContext } from "../../../contexts/ListsContext";
import { Link } from "react-router-dom";
import NothingHere from "../../ui/NothingHere";
import ContextMenu from "../../contextMenus/ContextMenu.jsx";
import ContextMenuButton from "../../contextMenus/ContextMenuButton.jsx";
import { taskActionsService } from "../../../services/TaskActionsService.js";
import { SORTING_ACTIONS } from "../../../constants/sorting-actions.js";
import { FILTER_ACTIONS } from "../../../constants/filter-actions.js";

export default function HomeTasksWidget({ selectedPeriod }) {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [originalTasks, setOriginalTasks] = useState([]);
  const { getTasksByPeriod, completeTask } = useListsContext();

  const [isSortContextMenuVisible, setSortContextMenuVisible] = useState(false);
  const [isFilterContextMenuVisible, setFilterContextMenuVisible] = useState(false);

  const toggleSortContextMenuVisibility = () => {
    setSortContextMenuVisible(!isSortContextMenuVisible);
    setFilterContextMenuVisible(false);
  };

  const toggleFilterContextMenuVisibility = () => {
    setFilterContextMenuVisible(!isFilterContextMenuVisible);
    setSortContextMenuVisible(false);
  };


  useEffect(() => {
    const tasks = getTasksByPeriod(selectedPeriod);
    setFilteredTasks(tasks);
    setOriginalTasks(tasks);
  }, [selectedPeriod, getTasksByPeriod]);

  const sortTasks = (action) => {
    const sortedTasks = taskActionsService.sort([...originalTasks], action);
    setFilteredTasks(sortedTasks);
  };

  const filterTasks = (action) => {
    const filteredTasks = taskActionsService.filter([...originalTasks], action);
    setFilteredTasks(filteredTasks);
  };

  return (
      <div className="home-tasks-widget">
        <div className="header">
          <p className="title">Tasks</p>
          <div className="header-block">
            <button className="sort-button" onClick={toggleFilterContextMenuVisibility}>
              <i className="hgi-stroke hgi-filter sort-icon"></i>
            </button>
            <button className="sort-button" onClick={toggleSortContextMenuVisibility}>
              <i className="hgi-stroke hgi-sort-by-down-02 sort-icon"></i>
            </button>
            <Link to={"/app/tasks"} className="view-all-link">
              View All
            </Link>
          </div>
        </div>

        {isSortContextMenuVisible && (
            <ContextMenu position={{ top: "160px", left: "410px" }} toggleVisibility={toggleSortContextMenuVisibility}>
              <ContextMenuButton title={"Sort by Priority"} icon={"hgi-stroke hgi-flag-02"} onClick={() => sortTasks(SORTING_ACTIONS.HIGH_PRIORITY_FIRST)} />
              <ContextMenuButton title={"Sort by Completed"} icon={"hgi-stroke hgi-checkmark-square-02"} onClick={() => sortTasks(SORTING_ACTIONS.COMPLETED_FIRST)} />
              <ContextMenuButton title={"Sort by Uncompleted"} icon={"hgi-stroke hgi-cancel-square"} onClick={() => sortTasks(SORTING_ACTIONS.UNCOMPLETED_FIRST)} />
            </ContextMenu>
        )}

        {isFilterContextMenuVisible && (
            <ContextMenu position={{ top: "160px", left: "375px" }} toggleVisibility={toggleFilterContextMenuVisibility}>
              <ContextMenuButton title={"Show Completed"} icon={"hgi-stroke hgi-checkmark-square-02"} onClick={() => filterTasks(FILTER_ACTIONS.SHOW_COMPLETED)} />
              <ContextMenuButton title={"Show Uncompleted"} icon={"hgi-stroke hgi-cancel-square"} onClick={() => filterTasks(FILTER_ACTIONS.SHOW_UNCOMPLETED)} />
              <ContextMenuButton title={"Show Overdue"} icon={"hgi-stroke hgi-clock-04"} onClick={() => filterTasks(FILTER_ACTIONS.SHOW_OVERDUE)} />
            </ContextMenu>
        )}

        <div className="task-container">
          {filteredTasks.length === 0 ? (
              <NothingHere icon={"fa-solid fa-clipboard-list"} />
          ) : (
              filteredTasks.map((task) => (
                  <HomeTask key={task._id} task={task} handleComplete={() => completeTask(task._id, task.listId)} />
              ))
          )}
        </div>

        <div className="hint-block">
          <div className="home-hint">
            <i className="fa-solid fa-circle-dot" style={{ color: "#378aff", marginRight: "8px" }}></i>
            <p>Current task</p>
          </div>
          <div className="home-hint">
            <i className="fa-solid fa-clock" style={{ color: "rgb(223, 58, 58)", marginRight: "8px" }}></i>
            <p>Overdue task</p>
          </div>
        </div>
      </div>
  );
}
