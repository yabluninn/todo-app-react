import { createPortal } from "react-dom";
import { useListsContext } from "../../contexts/ListsContext";
import { useState } from "react";

export default function SelectRelatedNoteModal({ onClose, onSelect }) {
    const root = document.getElementById("root");
    const { getRecentNotes } = useListsContext();
    const [selectedNote, setSelectedNote] = useState(null);

    const recentNotes = getRecentNotes();

    const handleSelect = () => {
        if (selectedNote) {
            onSelect(selectedNote);
        }
    };

    return createPortal(
        <div style={styles.container}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <p style={styles.title}>Select Related Note</p>
                    <button style={styles.closeButton} onClick={onClose}>
                        <i
                            className="hgi-stroke hgi-cancel-01"
                            style={styles.closeIcon}
                        ></i>
                    </button>
                </div>
                <div style={styles.content}>
                    {recentNotes.length > 0 ? (
                        recentNotes.map((note) => (
                            <div
                                key={note.id}
                                style={{
                                    ...styles.noteItem,
                                    borderColor:
                                        selectedNote?.id === note.id ? "#7437ff" : "transparent",
                                }}
                                onClick={() => setSelectedNote(note)}
                            >
                                {note.name}
                            </div>
                        ))
                    ) : (
                        <p>No recent notes available.</p>
                    )}
                </div>
                <div style={styles.footer}>
                    <button
                        style={styles.addButton}
                        onClick={handleSelect}
                        disabled={!selectedNote}
                    >
                        Add Related Note
                    </button>
                </div>
            </div>
        </div>,
        root
    );
}

const styles = {
    container: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        zIndex: 1000,
    },
    modal: {
        position: "relative",
        width: "60%",
        maxWidth: "500px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 1001,
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid #eee",
    },
    content: {
        padding: "24px",
    },
    footer: {
        padding: "16px 24px",
        borderTop: "1px solid #eee",
        display: "flex",
        justifyContent: "center",
    },
    noteItem: {
        padding: "12px",
        cursor: "pointer",
        borderRadius: "4px",
        marginBottom: "8px",
        border: "1px solid transparent",
    },
    addButton: {
        backgroundColor: "#7437ff",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "8px",
        padding: "10px 20px",
    },
};