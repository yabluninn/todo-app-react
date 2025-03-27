import { useEffect, useState } from "react";
import { headerService } from "../../../services/HeaderService";
import "../../../styles/home/Header.css";
import { dateExtensions } from "../../../utils/date-extensions";
import ContextMenu from "../../contextMenus/ContextMenu.jsx";
import ContextMenuButton from "../../contextMenus/ContextMenuButton.jsx";

export default function HomeHeader({ onOpenCreateTaskModal, onOpenCreateNoteModal, onChangePeriod }) {
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [isSelectPeriodContextMenuVisible, setIsSelectPeriodContextMenuVisible] = useState(false);
  const currDate = dateExtensions.getFormattedCurrentDate();
  const { text: greetingsPart, emoji: greetingEmoji } = headerService.getGreeting();

  const [username, setUsername] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("Today");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUsername(storedUser.username);
    }
  }, []);

  const toggleContextMenu = () => {
    setIsContextMenuVisible((prev) => !prev);
  };

  const toggleSelectPeriodContextMenu = () => {
    setIsSelectPeriodContextMenuVisible((prev) => !prev);
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    onChangePeriod(period);
    toggleSelectPeriodContextMenu();
  };

  return (
      <>
        <div className="m-header">
          <div className="h-labels-block">
            <p className="h-greetings-label">
              {greetingsPart}, {username || "Guest"}! 👋 {greetingEmoji}
            </p>
            <p className="h-sub-label">Today, {currDate}</p>
          </div>
          <div className="h-buttons-block">
            <div className="h-dropdown">
              <button className="h-dropdown-button" onClick={toggleSelectPeriodContextMenu}>
                <i className={isSelectPeriodContextMenuVisible ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}></i>
                {selectedPeriod}
              </button>
            </div>
            <button className="h-menu-button" onClick={toggleContextMenu}>
              <i className="hgi-stroke hgi-add-01"></i>
            </button>
            {isContextMenuVisible && (
                <ContextMenu position={{ top: "90px", right: "26px" }} toggleVisibility={toggleContextMenu}>
                  <ContextMenuButton title={"Create Task"} icon={"hgi-stroke hgi-task-add-01"} onClick={onOpenCreateTaskModal} />
                  <ContextMenuButton title={"Create Note"} icon={"hgi-stroke hgi-sticky-note-01"} onClick={onOpenCreateNoteModal} />
                </ContextMenu>
            )}
            {isSelectPeriodContextMenuVisible && (
                <ContextMenu position={{ top: "90px", right: "140px" }} toggleVisibility={toggleSelectPeriodContextMenu}>
                  <ContextMenuButton title="Today" icon="hgi-stroke hgi-calendar-01" onClick={() => handlePeriodChange("Today")} />
                  <ContextMenuButton title="3 days" icon="hgi-stroke hgi-calendar-03" onClick={() => handlePeriodChange("3 days")} />
                  <ContextMenuButton title="Week" icon="hgi-stroke hgi-calendar-03" onClick={() => handlePeriodChange("Week")} />
                  <ContextMenuButton title="Month" icon="hgi-stroke hgi-calendar-02" onClick={() => handlePeriodChange("Month")} />
                </ContextMenu>
            )}
          </div>
        </div>
      </>
  );
}
