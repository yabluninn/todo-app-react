import { createContext, useContext, useState } from "react";

const CategoriesContext = createContext();

// eslint-disable-next-line react/prop-types
export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    const addCategory = (category) => {
        setCategories((prevCategories) => [...prevCategories, category]);
    }

    const getCategoriesLength = () => {return categories.length;}

    const getCategoryById = (id) => {
        return categories.find(category => category.id === id);
    }

    const removeAllCategories = () => {
        setCategories([]);
    }

    return <CategoriesContext.Provider value={{categories, addCategory, getCategoriesLength, getCategoryById, removeAllCategories}}>{children}</CategoriesContext.Provider>;
}

export const useCategories = () => useContext(CategoriesContext);
export default CategoriesContext;