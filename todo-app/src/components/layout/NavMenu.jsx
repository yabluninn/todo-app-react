import "../../styles/NavMenu.css";
import NavList from "./NavList";
import CreateListButton from "../ui/CreateListButton";

export default function NavMenu() {
  return (
    <div className="nav-menu-container">
      <p className="nm-header">My Lists</p>
      <div className="nm-lists-container">
        <NavList />
        <NavList />
        <CreateListButton />
      </div>
    </div>
  );
}
