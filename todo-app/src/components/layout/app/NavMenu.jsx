import "../../../styles/NavMenu.css";
import NavButton from "../../ui/NavButton";
import NavUser from "./NavUser";
import ava from "../../../assets/avatar.png";
import { ACCOUNT_TYPES } from "../../../constants/account-types";

export default function NavMenu() {
  const accType = ACCOUNT_TYPES.FREE;
  const user = {
    username: "Artem Yablunin",
    avatar: ava,
    accountType: accType,
  };

  return (
    <div className="nav-menu-container">
      <p className="nm-header">My Dailybook</p>
      <div className="nm-buttons-container">
        <div className="nm-buttons-group">
          <NavButton
            icon={"hgi-stroke hgi-home-09"}
            label={"Home"}
            path={"/"}
          />
        </div>
        <div className="nm-buttons-group">
          <NavButton
            icon={"hgi-stroke hgi-task-01"}
            label={"Tasks"}
            path={"/tasks"}
          />
          <NavButton
            icon={"hgi-stroke hgi-sticky-note-02"}
            label={"Notes"}
            path={"/notes"}
          />
          <NavButton
            icon={"hgi-stroke hgi-brain-02"}
            label={"Habits"}
            path={"/habits"}
          />
          <NavButton
            icon={"hgi-stroke hgi-check-list"}
            label={"Lists"}
            path={"/lists"}
          />
          <NavButton
            icon={"hgi-stroke hgi-package"}
            label={"Categories"}
            path={"/categories"}
          />
        </div>
        <div className="nm-buttons-group">
          <NavButton
            icon={"hgi-stroke hgi-analytics-01"}
            label={"Analytics"}
            path={"/analytics"}
          />
          <NavButton
            icon={"hgi-stroke hgi-notification-03"}
            label={"Notifications"}
            path={"/notifications"}
          />
          <NavButton
            icon={"hgi-stroke hgi-settings-02"}
            label={"Settings"}
            path={"/settings"}
          />
        </div>
      </div>
      <NavUser user={user} />
    </div>
  );
}
