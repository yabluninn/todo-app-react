// import { useState } from "react";
// import { useTaskList } from "../../contexts/TaskListContext";

import { useState } from "react";
import { LIST_TYPES } from "../../constants/list-types";
import "../../styles/Lists.css";
import ListContainer from "../layout/groups/ListContainer";
import CreateListModal from "../modals/CreateListModal";
import { useListsContext } from "../../contexts/ListsContext";
import CategoriesContainer from "../layout/groups/CategoriesContainer";

export default function Groups() {
  const [isCreateListModalOpen, setCreateListModalOpen] = useState(false);
  const [currentListType, setCurrentListType] = useState(null);

  const { taskLists, noteLists } = useListsContext();

  const openCreateListModal = (listType) => {
    setCurrentListType(listType);
    setCreateListModalOpen(true);
  };

  const closeCreateListModal = () => {
    setCreateListModalOpen(false);
    setCurrentListType(null);
  };

  // const defaultLists = [
  //   {
  //     id: 0,
  //     name: "All",
  //     color: "rgb(160, 160, 160)",
  //     tasks: [],
  //   },
  //   { id: 1, name: "Today", color: "rgb(130, 130, 255)", tasks: [] },
  // ];

  return (
    <div className="lists-container">
      <div className="lists-header">
        <div>
          <p className="t-header-title">Groups</p>
          <p className="t-header-subtitle">
            Here you can manage all your lists and categories
          </p>
        </div>
        <button className="l-menu-button">
          <i className="hgi-stroke hgi-settings-02"></i>
        </button>
      </div>
      <CategoriesContainer />
      <div className="lists-grid">
        <ListContainer
          listType={LIST_TYPES.TASK_LIST}
          lists={taskLists}
          onOpenCreateListModal={() => {
            openCreateListModal(LIST_TYPES.TASK_LIST);
          }}
        />
        <ListContainer
          listType={LIST_TYPES.NOTES_LIST}
          lists={noteLists}
          onOpenCreateListModal={() => {
            openCreateListModal(LIST_TYPES.NOTES_LIST);
          }}
        />
      </div>
      {isCreateListModalOpen && (
        <CreateListModal
          listType={currentListType}
          onClose={closeCreateListModal}
        />
      )}
    </div>
  );
}
