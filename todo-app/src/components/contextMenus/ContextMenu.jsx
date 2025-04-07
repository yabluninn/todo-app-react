import "../../styles/modals/ContextMenu.css"
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

export default function ContextMenu({ position, toggleVisibility, children }) {
    const [isMobile, setIsMobile] = useState(false);

    const { t } = useTranslation();

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth <= 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    return (
        <>
            {isMobile && (
                <div className="context-menu-overlay visible" onClick={toggleVisibility}></div>
            )}
            <div
                className={`context-menu ${isMobile ? "center-on-mobile" : ""}`}
                style={
                    isMobile
                        ? {}
                        : {
                            top: position.top,
                            left: position.left,
                            right: position.right,
                            bottom: position.bottom,
                        }
                }
            >
                <div className="context-menu-buttons">{children}</div>
                <button className="context-menu-dismiss-button" onClick={toggleVisibility}>
                    {t('dismiss')}
                </button>
            </div>
        </>
    );
}
