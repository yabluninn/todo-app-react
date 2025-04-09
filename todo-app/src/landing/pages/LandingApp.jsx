import {Link, Route, Routes} from "react-router-dom";

import LandingNavMenu from "../LandingNavMenu";
import "../../styles/landing/LandingApp.css";

import logo from "../../assets/logo.png";
import LandingMain from "./LandingMain.jsx";
import LandingProduct from "./LandingProduct.jsx";
import LandingFeatures from "./LandingFeatures.jsx";
import LandingSolution from "./LandingSolution.jsx";
import LandingHelp from "./LandingHelp.jsx";
import LandingPricing from "./LandingPricing.jsx";
import LandingMobileMenu from "../LandingMobileMenu.jsx";
import {useState} from "react";

export default function LandingApp() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <div className="lpa-container">
            <div className="lp-header">
                <div className="lp-h-mobile">
                    <Link to="/" className="lp-h-mobile-logo">
                        <img src={logo} alt="" />
                    </Link>
                    <i className="hgi hgi-stroke hgi-menu-01 lp-h-mobile-menu" onClick={toggleMobileMenu}></i>
                </div>
                <div className="lp-h-block">
                    <Link to="/" className="logo-block">
                        <img src={logo} alt="" />
                        <p>Booxee</p>
                    </Link>
                    <LandingNavMenu />
                </div>
                <div className="lp-h-block">
                    <Link to={"/login"} className="lp-h-button lph-b-login">Log in</Link>
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
                    <Route path="/pricing" element={<LandingPricing/>}/>
                </Routes>
            </main>
            {isMobileMenuOpen && (<LandingMobileMenu onClose={toggleMobileMenu} isVisible={isMobileMenuOpen} />)}
        </div>
    );
}
