/* eslint-disable react/prop-types */
import { useState } from "react";
import { useListsContext } from "../../contexts/ListsContext";
import { Link } from "react-router-dom";
import { LIST_TYPES } from "../../constants/list-types";

import "../../styles/ListDropdown.css";

export default function ListDropdown({ onChange, listType }) {
  const [selectedList, setSelectedList] = useState("No List");
  const [isListVisible, setListVisible] = useState(false);

  const { taskLists, noteLists } = useListsContext();

  const handleSelect = (list) => {
    setSelectedList(list.name);
    onChange(list._id);
    setListVisible(false); // закрыть после выбора
  };

  const toggleVisibility = () => {
    setListVisible(!isListVisible);
  };

  const renderLists = (lists) =>
      lists.map((list) => (
          <li
              key={list._id}
              className="list-dropdown-item"
              style={{
                fontWeight: list.name === selectedList ? "bold" : "normal",
              }}
              onClick={() => handleSelect(list)}
          >
            <div
                className="list-color-icon"
                style={{ backgroundColor: list.color || "grey" }}
            ></div>
            {list.name}
          </li>
      ));

  return (
      <div className="list-dropdown-container">
        <p className="list-dropdown-label">
          <i className="hgi-stroke hgi-folder-02"></i>Select List
        </p>
        <div className="list-dropdown-wrapper">
          <div className="list-selected-item" onClick={toggleVisibility}>
            {selectedList}
            <i
                className={`hgi-stroke ${
                    isListVisible ? "hgi-arrow-up-01" : "hgi-arrow-down-01"
                } list-dropdown-icon`}
            ></i>
          </div>
          <ul
              className="list-dropdown-options"
              style={{ display: isListVisible ? "block" : "none" }}
          >
            {listType === LIST_TYPES.TASK_LIST && taskLists.length === 0 && (
                <Link to="/app/groups" className="new-list-button">
                  <i className="hgi-stroke hgi-add-01" style={{ marginRight: "6px" }}></i>
                  New Task List
                </Link>
            )}
            {listType === LIST_TYPES.NOTES_LIST && noteLists.length === 0 && (
                <Link to="/app/groups" className="new-list-button">
                  <i className="hgi-stroke hgi-add-01" style={{ marginRight: "6px" }}></i>
                  New Notes List
                </Link>
            )}
            {listType === LIST_TYPES.TASK_LIST && taskLists.length > 0 && renderLists(taskLists)}
            {listType === LIST_TYPES.NOTES_LIST && noteLists.length > 0 && renderLists(noteLists)}
          </ul>
        </div>
      </div>
  );
}