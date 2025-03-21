import "../styles/landing/LandingNavMenu.css";
import LandingNavButton from "./LandingNavButton";

export default function LandingNavMenu() {
  return (
    <div className="lnm-container">
      <LandingNavButton title={"Product"} path={"/product"} />
      <LandingNavButton title={"Features"} path={"/features"} />
      <LandingNavButton title={"Solution"} path={"/solution"}/>
      <LandingNavButton title={"Help"} path={"/help"}/>
      <LandingNavButton title={"Pricing"} path={"/pricing"}/>
    </div>
  );
}
