/* eslint-disable react/prop-types */
import "../styles/landing/LandingNavButton.css";
import {Link} from "react-router-dom";

export default function LandingNavButton({ title, path }) {
  return (
    <Link to={path} className="lnb-button">
      {title}
    </Link>
  );
}
