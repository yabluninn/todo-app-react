import "../styles/landing/LandingMobileMenu.css"
import LandingNavButton from "./LandingNavButton.jsx";
import {useEffect} from "react";

export default function LandingMobileMenu({onClose, isVisible}) {
    // useEffect(() => {
    //     const body = document.body;
    //     if (isVisible) {
    //         body.classList.add("no-scroll");
    //     } else {
    //         body.classList.remove("no-scroll");
    //     }
    //
    //     return () => {
    //         body.classList.remove("no-scroll");
    //     };
    // }, [isVisible]);

    return (
        <div className={isVisible ? "l-mobile-menu l-mm-visible" : "l-mm-hidden"}>
            <div className="l-mm-header">
                <i className="hgi hgi-stroke hgi-cancel-01" onClick={onClose}></i>
            </div>
            <div className="l-mm-buttons">
                <LandingNavButton title={"Product"} path={"/product"} />
                <LandingNavButton title={"Features"} path={"/features"} />
                <LandingNavButton title={"Solution"} path={"/solution"}/>
                <LandingNavButton title={"Help"} path={"/help"}/>
                <LandingNavButton title={"Pricing"} path={"/pricing"}/>
            </div>
        </div>
    )
}