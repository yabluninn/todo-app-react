/* eslint-disable react/prop-types */
import { useState } from "react";
import {useCategories} from "../../../contexts/CategoriesContext.jsx";

export default function Category({ category }) {
    const { removeCategory } = useCategories()

    return (
        <div
            style={{
                ...styles.main,
                backgroundColor: category.color,
            }}
        >
            <p style={{ color: "white" }}>{category.name}</p>
            <button style={styles.removeButton} onClick={
                () => removeCategory(category._id)
            }><i style={styles.icon} className="hgi hgi-stroke hgi-delete-02"></i></button>
        </div>
    );
}

const styles = {
    main: {
        width: "fit-content",
        fontSize: "14px",
        fontWeight: "bold",
        padding: "4px 16px",
        borderRadius: "16px",
        marginRight: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    removeButton: {
        width: "25px",
        height: "25px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        fontSize: "16px",
    },
    icon: {
        color: "white",
    }
};
