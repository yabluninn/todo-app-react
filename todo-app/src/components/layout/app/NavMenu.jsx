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
              label={"home"}
              path={"/"}
          />
        </div>
        <div className="nm-buttons-group">
          <NavButton
              icon={"hgi-stroke hgi-task-01"}
              label={"tasks"}
              path={"/tasks"}
          />
          <NavButton
              icon={"hgi-stroke hgi-sticky-note-02"}
              label={"notes"}
              path={"/notes"}
          />
          <NavButton
              icon={"hgi-stroke hgi-dashboard-square-02"}
              label={"groups"}
              path={"/groups"}
          />
        </div>
        <div className="nm-buttons-group">
          <NavButton
              icon={"hgi-stroke hgi-analytics-01"}
              label={"analytics"}
              path={"/analytics"}
          />
          <NavButton
              icon={"hgi-stroke hgi-notification-03"}
              label={"notifications"}
              path={"/notifications"}
          />
          <NavButton
              icon={"hgi-stroke hgi-settings-02"}
              label={"settings"}
              path={"/settings"}
          />
        </div>
        <div className="nm-buttons-group user-button">
          <NavButton
              icon={"hgi-stroke hgi-user"}
              label={"profile"}
              path={"/profile"}
          />
        </div>
      </div>
      {user ? <NavUser user={user}/> : <p>Loading...</p>}
    </div>
  );
}
