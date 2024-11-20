import "../../styles/NavMenu.css";
import CreateListButton from "../ui/CreateListButton";
import NavButton from "../ui/NavButton";

export default function NavMenu() {
  return (
    <div className="nav-menu-container">
      <p className="nm-header">My Dailybook</p>
      <div className="nm-buttons-container">
        <div className="nm-buttons-group">
          <NavButton icon={"hgi-stroke hgi-home-09"} label={"Home"} />
        </div>
        <div className="nm-buttons-group">
          <NavButton icon={"hgi-stroke hgi-task-01"} label={"Tasks"} />
          <NavButton icon={"hgi-stroke hgi-check-list"} label={"Lists"} />
          <NavButton icon={"hgi-stroke hgi-sticky-note-02"} label={"Notes"} />
          <NavButton icon={"hgi-stroke hgi-brain-02"} label={"Habits"} />
        </div>
        <div className="nm-buttons-group">
          <NavButton icon={"hgi-stroke hgi-analytics-01"} label={"Analytics"} />
        </div>
        <CreateListButton />
      </div>
    </div>
  );
}
