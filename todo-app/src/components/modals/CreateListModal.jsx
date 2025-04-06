import { createPortal } from "react-dom";
import { useState } from "react";

import InputWithLabel from "../ui/InputWithLabel";
import { LIST_TYPES } from "../../constants/list-types";
import { useListsContext } from "../../contexts/ListsContext";

import "../../styles/modals/CreateListModal.css"

export default function CreateListModal({ listType, onClose }) {
  const root = document.getElementById("root");

  const { addTaskList, getTaskListsLength, addNoteList, getNoteListsLength } =
      useListsContext();

  const [listName, setListName] = useState("");
  const [listColor, setListColor] = useState("");

  const handleAddList = () => {
    if (listName.trim() !== "" && listColor.trim() !== "") {
      if (listType === LIST_TYPES.TASK_LIST) {
        const id = getTaskListsLength();
        const newList = {
          id: id,
          name: listName,
          color: listColor,
          tasks: [],
        };
        addTaskList(newList);
      } else if (listType === LIST_TYPES.NOTES_LIST) {
        const id = getNoteListsLength();
        const newList = {
          id: id,
          name: listName,
          color: listColor,
          notes: [],
        };
        addNoteList(newList);
      }

      onClose();
    }
  };

  return createPortal(
      <div className="create-list-container">
        <div className="create-list-modal">
          <div className="create-list-header">
            <p className="create-list-title">
              {"Create " +
                  (listType === LIST_TYPES.TASK_LIST
                      ? "Task"
                      : listType === LIST_TYPES.NOTES_LIST
                          ? "Notes"
                          : "") +
                  " List"}
            </p>
            <button className="create-list-close-button" onClick={onClose}>
              <i className="hgi-stroke hgi-cancel-01 create-list-close-icon"></i>
            </button>
          </div>
          <div className="create-list-content">
            <InputWithLabel
                type="text"
                placeholder="Enter list name"
                label="Name"
                icon="hgi-stroke hgi-text-font"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
            />
            <InputWithLabel
                type="color"
                placeholder="Set list color"
                label="Color"
                icon="hgi-stroke hgi-paint-board"
                value={listColor}
                onChange={(e) => setListColor(e.target.value)}
            />
          </div>
          <div className="create-list-footer">
            <button className="add-list-button" onClick={handleAddList}>
              <i
                  className={
                    listType === LIST_TYPES.TASK_LIST
                        ? "hgi-stroke hgi-task-daily-02 add-list-icon"
                        : listType === LIST_TYPES.NOTES_LIST
                            ? "hgi-stroke hgi-sticky-note-02 add-list-icon"
                            : "add-list-icon"
                  }
              ></i>
              Create list
            </button>
          </div>
        </div>
      </div>,
      root
  );
}
