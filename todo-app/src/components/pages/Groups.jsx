// import { useState } from "react";
// import { useTaskList } from "../../contexts/TaskListContext";

import { useState } from "react";
import { LIST_TYPES } from "../../constants/list-types";
import "../../styles/Lists.css";
import ListContainer from "../layout/groups/ListContainer";
import CreateListModal from "../modals/CreateListModal";
import { useListsContext } from "../../contexts/ListsContext";
import CategoriesContainer from "../layout/groups/CategoriesContainer";
import CreateCategoryModal from "../modals/CreateCategoryModal.jsx";
import TaskSideSection from "../layout/tasks/TaskSideSection.jsx";
import ListSideSection from "../layout/groups/ListSideSection.jsx";

export default function Groups() {
  const [isCreateListModalOpen, setCreateListModalOpen] = useState(false);
  const [isCreateCategoryModalOpen, setCreateCategoryModalOpen] = useState(false);
  const [isListSideMenuOpen, setListSideMenuOpen] = useState(false);

  const [selectedList, setSelectedList] = useState(null);
  const [selectedListType, setSelectedListType] = useState("");

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

  const openCreateCategoryModal = () => {
    setCreateCategoryModalOpen(true);
  }
  const closeCreateCategoryModal = () => {
    setCreateCategoryModalOpen(false);
  }

  const handleEditList = (list, listType) => {
    if (!list) {
      console.error("List is undefined");
      return;
    }
    setSelectedList(list);
    setSelectedListType(listType);
    setListSideMenuOpen(true);
  };

  const closeListSideMenu = () => {
    setListSideMenuOpen(false);
    setSelectedList(null);
    setSelectedListType("");
  };

  return (
    <div className="page-container">
      <div className="lists-header">
        <div>
          <p className="t-header-title">Groups</p>
          <p className="t-header-subtitle">
            Here you can manage all your lists and categories
          </p>
        </div>
      </div>
      <CategoriesContainer openModal={openCreateCategoryModal}/>
      <div className="lists-grid">
        <ListContainer
          listType={LIST_TYPES.TASK_LIST}
          lists={taskLists}
          onOpenCreateListModal={() => {
            openCreateListModal(LIST_TYPES.TASK_LIST);
          }}
          onListSideMenuOpen={(list) => handleEditList(list, LIST_TYPES.TASK_LIST)}
        />
        <ListContainer
          listType={LIST_TYPES.NOTES_LIST}
          lists={noteLists}
          onOpenCreateListModal={() => {
            openCreateListModal(LIST_TYPES.NOTES_LIST);
          }}
          onListSideMenuOpen={(list) => handleEditList(list, LIST_TYPES.NOTES_LIST)}
        />
      </div>
      {isCreateListModalOpen && (
        <CreateListModal
          listType={currentListType}
          onClose={closeCreateListModal}
        />
      )}
      {isCreateCategoryModalOpen && (
          <CreateCategoryModal onClose={closeCreateCategoryModal} />
      )}
      {isListSideMenuOpen && selectedList && (
          <ListSideSection list={selectedList} onClose={closeListSideMenu} listType={selectedListType} />
      )}
    </div>
  );
}
