import { LIST_TYPES } from "../../../constants/list-types";
import CreateButton from "../../ui/CreateButton";
import List from "./List";
import {useState} from "react";
import ContextMenu from "../../contextMenus/ContextMenu.jsx";
import ContextMenuButton from "../../contextMenus/ContextMenuButton.jsx";

/* eslint-disable react/prop-types */
export default function ListContainer({
  listType,
  lists,
  onOpenCreateListModal,
}) {
  const [isTasksContextMenuVisible, setIsTasksContextMenuVisible] = useState(false);
  const [isNotesContextMenuVisible, setIsNotesContextMenuVisible] = useState(false);

  const handleTasksContextMenuClick = () => {
    setIsTasksContextMenuVisible(!isTasksContextMenuVisible);
  };
  const handleNotesContextMenuClick = () => {
    setIsNotesContextMenuVisible(!isNotesContextMenuVisible);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerBlock}>
          <i
            className={
              listType === LIST_TYPES.TASK_LIST
                ? "hgi-stroke hgi-task-daily-02"
                : listType === LIST_TYPES.NOTES_LIST
                ? "hgi-stroke hgi-sticky-note-02"
                : ""
            }
            style={styles.headerIcon}
          ></i>
          <p style={styles.title}>{listType + " List"}</p>
        </div>
        <button style={styles.moreButton} onClick={listType === LIST_TYPES.TASK_LIST ? handleTasksContextMenuClick : listType === LIST_TYPES.NOTES_LIST ? handleNotesContextMenuClick : ""}>
          <i
            className="hgi-stroke hgi-more-vertical"
            style={styles.moreIcon}
          ></i>
        </button>
      </div>
      <div style={styles.grid}>
        {lists &&
          lists.map((list) => (
            <List key={list.id} list={list} listType={listType} />
          ))}
      </div>
      <CreateButton title={"New List"} onClick={onOpenCreateListModal} />
      {isTasksContextMenuVisible && LIST_TYPES.TASK_LIST && (
          <ContextMenu
              position={{
                top: "282px",
                left: "675px",
              }}
              toggleVisibility={handleTasksContextMenuClick}
          >
            <ContextMenuButton title={"Remove All"} icon={"hgi-stroke hgi-delete-02"} onClick={""}/>
          </ContextMenu>
      )}
      {isNotesContextMenuVisible && LIST_TYPES.NOTES_LIST && (
          <ContextMenu
              position={{
                top: "282px",
                right: "135px",
              }}
              toggleVisibility={handleNotesContextMenuClick}
          >
            <ContextMenuButton title={"Remove All"} icon={"hgi-stroke hgi-delete-02"} onClick={""}/>
          </ContextMenu>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "120px",
    maxHeight: "420px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "rgba(99, 99, 99, 0.05) 0px 2px 12px 0px",
    padding: "12px",
  },
  header: {
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottom: "1px solid #eee",
  },
  headerBlock: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
  },
  headerIcon: {
    fontSize: "18px",
    marginRight: "8px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  moreButton: {
    width: "35px",
    height: "35px",
  },
  moreIcon: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  grid: {
    maxHeight: "230px",
    marginTop: "12px",
    overflowY: "auto",
  },
};
