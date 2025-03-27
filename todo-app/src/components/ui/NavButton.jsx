import { Link } from "react-router-dom";
import "../../styles/navigation/NavButton.css"

/* eslint-disable react/prop-types */

export default function NavButton({ icon, label, path }) {

  const DEFAULT_APP_URL = "/app";

  return (
      <Link to={DEFAULT_APP_URL + path} className="nav-button">
        <i className={`${icon} nav-button-icon`}></i>
        <p className="nav-button-label">{label}</p>
      </Link>
  );
}
