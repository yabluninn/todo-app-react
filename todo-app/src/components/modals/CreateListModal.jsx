import { createPortal } from "react-dom";
import { useState } from "react";

import InputWithLabel from "../ui/InputWithLabel";
import { LIST_TYPES } from "../../constants/list-types";
import { useListsContext } from "../../contexts/ListsContext";

import "../../styles/modals/CreateListModal.css"
import {useTranslation} from "react-i18next";

export default function CreateListModal({ listType, onClose }) {
  const root = document.getElementById("root");

  const { t } = useTranslation();

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

  const getModalTitle = () => {
    if (listType === LIST_TYPES.TASK_LIST) return t("create_task_list");
    if (listType === LIST_TYPES.NOTES_LIST) return t("create_notes_list");
    return t("create_list_button");
  };

  return createPortal(
      <div className="create-list-container">
        <div className="create-list-modal">
          <div className="create-list-header">
            <p className="create-list-title">{getModalTitle()}</p>
            <button className="create-list-close-button" onClick={onClose}>
              <i className="hgi-stroke hgi-cancel-01 create-list-close-icon"></i>
            </button>
          </div>
          <div className="create-list-content">
            <InputWithLabel
                type="text"
                placeholder={t("enter_list_name")}
                label={t("list_name")}
                icon="hgi-stroke hgi-text-font"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
            />
            <InputWithLabel
                type="color"
                placeholder={t("set_list_color")}
                label={t("list_color")}
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
              {t("create_list_button")}
            </button>
          </div>
        </div>
      </div>,
      root
  );
}
