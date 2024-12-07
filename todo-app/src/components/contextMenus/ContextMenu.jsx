/* eslint-disable react/prop-types */

export default function ContextMenu({position, toggleVisibility, children}) {
    return (
        <div style={{...styles.contextMenu, top: position.top, right: position.right, bottom: position.bottom, left: position.left}}>
            <div style={styles.contextMenuButtons}>
                {children}
            </div>
            <button
                style={styles.contextMenuDismissButton}
                onClick={toggleVisibility}
            >
                Dismiss
            </button>
        </div>);
}

const styles = {
    contextMenu: {
        position: "absolute",
        backgroundColor: "white",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        zIndex: "1000",
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        padding: "10px",
    },
    contextMenuButtons: {
        width: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
        borderBottom: "1px solid #c8c8c8",
        paddingBottom: "8px",
    },
    contextMenuDismissButton: {
        color: "#707070",
        backgroundColor: "#efefef",
        marginTop: "8px",
        padding: "4px",
        fontSize: "14px",
        justifyContent: "center !important",
        borderRadius: "8px",
    },
}
