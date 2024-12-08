/* eslint-disable react/prop-types */
import {useState} from "react";

export default function SideCategory({ category, onSelected }) {
    const [isHovered, setHovered] = useState(false);

    const selectCategory = () => {
        onSelected(category.id)
    }

    return (
        <p
            style={{
                ...styles.main,
                backgroundColor: category.color,
                color: "white",
            }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        >
            {category.name}
            {isHovered && (<button style={styles.deleteButton} onClick={selectCategory}><i className={"hgi-stroke hgi-cancel-01"} style={styles.deleteIcon}></i></button>)}
        </p>
    );
}

const styles = {
    main: {
        width: "fit-content",
        fontSize: "14px",
        fontWeight: "bold",
        padding: "4px 12px 4px 12px",
        borderRadius: "16px",
    },
    deleteButton: {
        width: "18px",
        height: "18px",
        position: "absolute",
        backgroundColor: "red",
        borderRadius: "16px",
        marginTop: "-30px",
        marginLeft: "25px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    deleteIcon: {
        fontSize: "12px",
        fontWeight: "bold",
        color: "white",
    }
};
