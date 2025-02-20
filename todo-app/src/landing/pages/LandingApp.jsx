import {Link, Route, Routes} from "react-router-dom";

import LandingNavMenu from "../LandingNavMenu";
import "../../styles/landing/LandingApp.css";

import logo from "../../assets/logo.png";
import LandingMain from "./LandingMain.jsx";
import LandingProduct from "./LandingProduct.jsx";
import LandingFeatures from "./LandingFeatures.jsx";
import LandingSolution from "./LandingSolution.jsx";
import LandingHelp from "./LandingHelp.jsx";

export default function LandingApp() {
    return (
        <div className="lpa-container">
            <div className="lp-header">
                <div className="lp-h-block">
                    <Link to="/" className="logo-block">
                        <img src={logo} alt="" />
                        <p>Booxee</p>
                    </Link>
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
            <main className="lp-content">
                <Routes>
                    <Route path="/" element={<LandingMain/>}/>
                    <Route path="/product" element={<LandingProduct/>}/>
                    <Route path="/features" element={<LandingFeatures/>}/>
                    <Route path="/solution" element={<LandingSolution/>}/>
                    <Route path="/help" element={<LandingHelp/>}/>
                </Routes>
            </main>
        </div>
    );
}
