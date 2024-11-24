/* eslint-disable react/prop-types */
import { useState } from "react";
import { headerService } from "../../services/HeaderService";
import "../../styles/Header.css";
import { currentDate } from "../../utils/current-date";

export default function Header({ onOpenCreateTaskModal }) {
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const currDate = currentDate.getFormattedCurrentDate();
  const { text: greetingsPart, emoji: greetingEmoji } =
    headerService.getGreeting();

  const username = "Artem";

  const toggleContextMenu = () => {
    setIsContextMenuVisible((prev) => !prev);
  };

  return (
    <>
      <div className="header">
        <div className="h-labels-block">
          <p className="h-greetings-label">
            {greetingsPart}, {username}! 👋 {greetingEmoji}
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
            <div className="add-context-menu">
              <div className="add-context-menu-buttons">
                <button onClick={onOpenCreateTaskModal}>
                  <i className="hgi-stroke hgi-task-add-01"></i>
                  Create a task
                </button>
                <button>
                  <i className="hgi-stroke hgi-sticky-note-01"></i>
                  Create a note
                </button>
              </div>
              <button
                className="add-context-menu-dissmiss-btn"
                onClick={toggleContextMenu}
              >
                Dismiss
              </button>
            </div>
          )}
          <button className="h-menu-button">
            <i className="hgi-stroke hgi-settings-02"></i>
          </button>
          {/* <button className="h-menu-button">
            <i className="hgi-stroke hgi-filter"></i>
          </button> */}
        </div>
      </div>
    </>
  );
}
