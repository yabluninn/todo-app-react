/* eslint-disable react/prop-types */
import {useState} from "react";
import { useTranslation } from 'react-i18next';

export default function ContextMenuButton({title, icon, onClick}) {
    const [isHovered, setHovered] = useState(false);
    const { t } = useTranslation();

    return (
        <button
            style={{...styles.contextMenuButton, backgroundColor: isHovered ? "#f7f7f7" : "transparent"}}
            onClick={onClick}
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <i
                className={icon}
                style={styles.contextMenuButtonIcon}
            ></i>
            {t(title)}
        </button>)
}

const styles = {
    contextMenuButton: {
        width: "100%",
        height: "35px",
        paddingLeft: "8px",
        paddingRight: "16px",
        color: "#333",
        cursor: "pointer",
        fontSize: "16px",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        borderRadius: "8px",
    },
    contextMenuButtonIcon: {
        marginRight: "12px",
    },
}