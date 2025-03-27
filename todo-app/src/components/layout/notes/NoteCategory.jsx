/* eslint-disable react/prop-types */
import { useState } from "react";
import {useCategories} from "../../../contexts/CategoriesContext.jsx";

export default function NoteCategory({ category }) {
    return (
        <div
            style={{
                ...styles.main,
                backgroundColor: category.color,
            }}
        >
            <p style={{ color: "white" }}>{category.name}</p>
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
    }
};
