import { Link } from "react-router-dom";

import LandingNavMenu from "../LandingNavMenu";
import "../../styles/landing/LandingMain.css";

import logo from "../../assets/logo.png";
import icon1 from "../../assets/i-1.png";
import icon2 from "../../assets/i-2.png";

export default function LandingMain() {
  return (
    <div className="lpm-container">
      <div className="lp-header">
        <div className="lp-h-block">
          <div className="logo-block">
            <img src={logo} alt="" />
            <p>Booxee</p>
          </div>
          <LandingNavMenu />
        </div>
        <div className="lp-h-block">
          <button className="lp-h-button lph-b-demo">
            Book a demo <i className="hgi-stroke hgi-arrow-right-01"></i>
          </button>
          <button className="lp-h-button lph-b-login">Log in</button>
          <Link to={"/signup"} className="lp-h-button lph-b-signup">
            Start for free
          </Link>
        </div>
      </div>
      <div className="lp-main">
        <p className="lp-main-h">
          Your productivity, <span>Simplified</span>
        </p>
        <p className="lp-main-subh">
          <span>Organize</span> your tasks, habits, notes, and finances in one
          <span> customizable</span> app.
        </p>
        <Link to={"/signup"} className="lp-main-button">
          Get started
        </Link>
      </div>
      <img src={icon1} alt="" className="lp-icon lpi-1" />
      <img src={icon2} alt="" className="lp-icon lpi-2" />
    </div>
  );
}
