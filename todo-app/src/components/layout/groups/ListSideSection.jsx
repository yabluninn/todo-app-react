/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import EditInput from "../../ui/EditInput";
import {LIST_TYPES} from "../../../constants/list-types.js";
import {useListsContext} from "../../../contexts/ListsContext.jsx";
import {useTranslation} from "react-i18next";

import "../../../styles/tasks/TaskSideSection.css"

export default function ListSideSection({ list, listType, onClose }) {
  const { updateTaskList, updateNoteList } = useListsContext();
  const { t } = useTranslation();

  const [newListName, setNewListName] = useState(list.name || "");
  const [newListColor, setNewListColor] = useState(list.color || "#ffffff");

  useEffect(() => {
    setNewListName(list.name || "");
    setNewListColor(list.color || "#ffffff");
  }, [list]);


  const saveList = () => {
    const updatedList = {
      name: newListName,
      color: newListColor
    };

    if (listType === LIST_TYPES.TASK_LIST){
      updateTaskList(list._id, updatedList);

    }
    else if (listType === LIST_TYPES.NOTES_LIST){
      updateNoteList(list._id, updatedList);
    }

    onClose();
  };

  const isDefaultList = () => {
    if (listType === LIST_TYPES.TASK_LIST){
      return list.name === "All";
    }
    else if (listType === LIST_TYPES.NOTES_LIST){
      return list.name === "Notes";
    }
  }

  return (
      <div className="task-side-container">
        <div className="task-side-content">
          <div className="task-side-header">
            <div className="task-side-header-subblock">
              <i className="hgi-stroke hgi-arrow-right-double task-side-header-icon"></i>
              <p className="task-side-header-listname">{t("list_type_title", {type: t(listType.toLowerCase())})}</p>
            </div>
            <button className="task-side-close-button" onClick={onClose}>
              <i className="hgi-stroke hgi-cancel-01 task-side-close-icon"></i>
            </button>
          </div>
          <div className="task-side-info-block">
            <div className="task-side-info-subblock">
              <EditInput
                  type="text"
                  placeholder={t("list-name-placeholder")}
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
              />
              <p className="task-side-info-label">{t("name")}</p>
            </div>
          </div>
          <div className="task-side-info-block">
            <div className="task-side-info-subblock">
              <EditInput
                  type="color"
                  placeholder="Set list color"
                  value={newListColor}
                  onChange={(e) => setNewListColor(e.target.value)}
              />
              <p className="task-side-info-label">{t("color")}</p>
            </div>
          </div>

          <p className={isDefaultList() ? "error-label" : "label-hidden"}>{t("edit-default-list-error")}</p>
          <button
              className={isDefaultList() ? "save-button-disabled" : "task-side-save-button"}
              onClick={saveList}
              disabled={isDefaultList()}
          >
            {t("save")}
          </button>
        </div>
      </div>
  );
}
