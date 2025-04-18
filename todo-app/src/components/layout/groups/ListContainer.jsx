/* eslint-disable react/prop-types */

import "../../../styles/ListContainer.css"; // Подключаем CSS
import { LIST_TYPES } from "../../../constants/list-types";
import CreateButton from "../../ui/CreateButton";
import List from "./List";
import { useListsContext } from "../../../contexts/ListsContext.jsx";

import {useTranslation} from "react-i18next";

export default function ListContainer({ listType, lists, onOpenCreateListModal, onListSideMenuOpen }) {

  const { removeTaskList, removeNoteList } = useListsContext();
  const { t } = useTranslation();

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
            <p className="list-title">{t("lists_type_title", {type: t(listType)})}</p>
          </div>
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
                      onEdit={() => {
                          onListSideMenuOpen(list);
                      }}
                  />
              ))}
        </div>
        <CreateButton title={"new-list"} onClick={onOpenCreateListModal} />
      </div>
  );
}
