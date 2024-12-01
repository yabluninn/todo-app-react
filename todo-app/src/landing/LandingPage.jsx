import "../styles/landing/LandingPage.css";

import logo from "../assets/logo.png";
import icon1 from "../assets/i-1.png";
import icon2 from "../assets/i-2.png";

import LandingNavMenu from "./LandingNavMenu";

export default function LandingPage() {
  return (
    <div className="lp-container">
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
          <button className="lp-h-button lph-b-signup">Start for free</button>
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
        <button className="lp-main-button">Get started</button>
      </div>
      <img src={icon1} alt="" className="lp-icon lpi-1" />
      <img src={icon2} alt="" className="lp-icon lpi-2" />
    </div>
  );
}
