// import { useState } from "react";
// import { useTaskList } from "../../contexts/TaskListContext";

import { LIST_TYPES } from "../../constants/list-types";
import "../../styles/Lists.css";
import ListContainer from "../layout/lists/ListContainer";

export default function Lists() {
  //   const { tasks } = useTaskList();

  const defaultLists = [
    {
      id: 0,
      name: "All",
      color: "rgb(160, 160, 160)",
      tasks: [],
    },
    { id: 1, name: "Today", color: "rgb(130, 130, 255)", tasks: [] },
  ];

  return (
    <div className="lists-container">
      <div className="lists-header">
        <p className="l-header-title">Lists</p>
        <button className="l-menu-button">
          <i className="hgi-stroke hgi-settings-02"></i>
        </button>
      </div>
      <div className="lists-grid">
        <ListContainer listType={LIST_TYPES.TASK_LIST} lists={defaultLists} />
        <ListContainer listType={LIST_TYPES.NOTES_LIST} />
      </div>
    </div>
  );
}
