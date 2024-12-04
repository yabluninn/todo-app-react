import "../styles/landing/LandingNavMenu.css";
import LandingNavButton from "./LandingNavButton";

export default function LandingNavMenu() {
  return (
    <div className="lnm-container">
      <LandingNavButton title={"Product"} isDropdown={true} />
      <LandingNavButton title={"Features"} isDropdown={true} />
      <LandingNavButton title={"Solution"} isDropdown={true} />
      <LandingNavButton title={"Help"} isDropdown={true} />
      <LandingNavButton title={"Pricing"} isDropdown={false} />
    </div>
  );
}
