import "../../../styles/navigation/NavMenu.css";
import NavButton from "../../ui/NavButton";
import NavUser from "./NavUser";
import {useEffect, useState} from "react";
import axios from "axios";

export default function NavMenu() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser?.id) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/user/${parsedUser.id}`);
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, []);


  return (
    <div className="nav-menu-container">
      <p className="nm-header">Booxee</p>
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
            icon={"hgi-stroke hgi-dashboard-square-02"}
            label={"Groups"}
            path={"/groups"}
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
      {user ? <NavUser user={user} /> : <p>Loading...</p>}
    </div>
  );
}
