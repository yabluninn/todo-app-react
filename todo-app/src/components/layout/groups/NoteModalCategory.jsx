/* eslint-disable react/prop-types */

import {colorExtensions} from "../../../utils/color-extensions.js";
import {useState} from "react";

export default  function NoteModalCategory({category, onChange}) {
    const categoryRgbColor = colorExtensions.hexToRgb(category.color);
    const categoryRgbaColor = colorExtensions.rgbToRgba(categoryRgbColor, 0.1);

    const [isSelected, setIsSelected] = useState(false);

    const handleSelect = (category) => {
        setIsSelected(true);
        onChange(category);
    }

    return (<p
        style={{
            ...styles.main,
            backgroundColor: isSelected ? category.color : categoryRgbaColor,
            border: `1px solid ${category.color}`,
            color: isSelected ? "white" : category.color,
        }}
        onClick={() => handleSelect(category)}
    >
        {category.name}
    </p>)
}

const styles = {
    main: {
        width: "fit-content",
        fontSize: "14px",
        fontWeight: "bold",
        padding: "4px 12px 4px 12px",
        borderRadius: "16px",
        marginRight: "8px",
        cursor: "pointer",
    },
};
