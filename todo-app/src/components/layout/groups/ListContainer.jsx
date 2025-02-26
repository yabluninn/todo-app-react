/* eslint-disable react/prop-types */

import "../../../styles/ListContainer.css"; // Подключаем CSS
import { LIST_TYPES } from "../../../constants/list-types";
import CreateButton from "../../ui/CreateButton";
import List from "./List";
import { useState } from "react";
import ContextMenu from "../../contextMenus/ContextMenu.jsx";
import ContextMenuButton from "../../contextMenus/ContextMenuButton.jsx";
import { useListsContext } from "../../../contexts/ListsContext.jsx";

export default function ListContainer({ listType, lists, onOpenCreateListModal }) {
  const [isTasksContextMenuVisible, setIsTasksContextMenuVisible] = useState(false);
  const [isNotesContextMenuVisible, setIsNotesContextMenuVisible] = useState(false);

  const { removeTaskList, removeNoteList, removeAllTaskLists, removeAllNoteLists } = useListsContext();

  const handleTasksContextMenuClick = () => {
    setIsTasksContextMenuVisible(!isTasksContextMenuVisible);
    setIsNotesContextMenuVisible(false);
  };

  const handleNotesContextMenuClick = () => {
    setIsNotesContextMenuVisible(!isNotesContextMenuVisible);
    setIsTasksContextMenuVisible(false);
  };

  return (
      <div className="list-container">
        <div className="list-header">
          <div className="list-header-block">
            <i
                className={`header-icon ${
                    listType === LIST_TYPES.TASK_LIST
                        ? "hgi-stroke hgi-task-daily-02"
                        : listType === LIST_TYPES.NOTES_LIST
                            ? "hgi-stroke hgi-sticky-note-02"
                            : ""
                }`}
            />
            <p className="list-title">{listType + " Lists"}</p>
          </div>
          <button className="more-button"
                  onClick={listType === LIST_TYPES.TASK_LIST ? handleTasksContextMenuClick : listType === LIST_TYPES.NOTES_LIST ? handleNotesContextMenuClick : null}>
            <i className="hgi-stroke hgi-more-vertical more-icon"></i>
          </button>
        </div>
        <div className="list-grid">
          {lists &&
              lists.map((list) => (
                  <List
                      key={list._id}
                      list={list}
                      listType={listType}
                      onDelete={() =>
                          listType === LIST_TYPES.TASK_LIST
                              ? removeTaskList(list._id)
                              : listType === LIST_TYPES.NOTES_LIST
                                  ? removeNoteList(list._id)
                                  : console.error("Unknown list type")
                      }
                  />
              ))}
        </div>
        <CreateButton title={"New List"} onClick={onOpenCreateListModal} />

        {isTasksContextMenuVisible && listType === LIST_TYPES.TASK_LIST && (
            <ContextMenu position={{ top: "282px", left: "675px" }} toggleVisibility={handleTasksContextMenuClick}>
              <ContextMenuButton title={"Remove All"} icon={"hgi-stroke hgi-delete-02"} onClick={removeAllTaskLists} />
            </ContextMenu>
        )}

        {isNotesContextMenuVisible && listType === LIST_TYPES.NOTES_LIST && (
            <ContextMenu position={{ top: "282px", right: "135px" }} toggleVisibility={handleNotesContextMenuClick}>
              <ContextMenuButton title={"Remove All"} icon={"hgi-stroke hgi-delete-02"} onClick={removeAllNoteLists} />
            </ContextMenu>
        )}
      </div>
  );
}
