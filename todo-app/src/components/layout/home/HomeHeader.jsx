/* eslint-disable react/prop-types */
import {useEffect, useState} from "react";
import { headerService } from "../../../services/HeaderService";
import "../../../styles/Header.css";
import { dateExtensions } from "../../../utils/date-extensions";
import ContextMenu from "../../contextMenus/ContextMenu.jsx";
import ContextMenuButton from "../../contextMenus/ContextMenuButton.jsx";

export default function HomeHeader({
  onOpenCreateTaskModal,
  onOpenCreateNoteModal,
}) {
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const currDate = dateExtensions.getFormattedCurrentDate();
  const { text: greetingsPart, emoji: greetingEmoji } =
    headerService.getGreeting();

  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUsername(storedUser.username);
    }
  }, []);

  const toggleContextMenu = () => {
    setIsContextMenuVisible((prev) => !prev);
  };

  return (
    <>
      <div className="header">
        <div className="h-labels-block">
          <p className="h-greetings-label">
            {greetingsPart}, {username || "Guest"}! 👋 {greetingEmoji}
          </p>
          <p className="h-sub-label">Today, {currDate}</p>
        </div>
        <div className="h-buttons-block">
          <div className="h-dropdown">
            <button className="h-dropdown-button">
              <i className="fa-solid fa-chevron-down"></i>Today
            </button>
            <div className="h-dropdown-content">
              <a href="#">Option 1</a>
              <a href="#">Option 2</a>
              <a href="#">Option 3</a>
              <a href="#">Option 4</a>
            </div>
          </div>
          <button className="h-menu-button" onClick={toggleContextMenu}>
            <i className="hgi-stroke hgi-add-01"></i>
          </button>
          {isContextMenuVisible && (
              <ContextMenu position={{top: "90px", right: "80px"}} toggleVisibility={toggleContextMenu}>
                <ContextMenuButton title={"Create Task"} icon={"hgi-stroke hgi-task-add-01"} onClick={onOpenCreateTaskModal}/>
                <ContextMenuButton title={"Create Note"} icon={"hgi-stroke hgi-sticky-note-01"} onClick={onOpenCreateNoteModal}/>
              </ContextMenu>
          )}
          <button className="h-menu-button">
            <i className="hgi-stroke hgi-settings-02"></i>
          </button>
        </div>
      </div>
    </>
  );
}
