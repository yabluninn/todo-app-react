import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {useListsContext} from "./ListsContext.jsx";

const CategoriesContext = createContext();

// eslint-disable-next-line react/prop-types
export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    const { fetchNoteLists } = useListsContext()

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            const response = await axios.get(`http://localhost:5000/api/categories?userId=${user.id}`);
            setCategories(response.data);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    const addCategory = async (category) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await axios.post("http://localhost:5000/api/categories", {
                userId: user.id,
                name: category.name,
                color: category.color,
            });

            setCategories((prevCategories) => [...prevCategories, response.data]);
        } catch (err) {
            console.error("Error adding category:", err);
        }
    };

    const updateCategory = async (id, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/categories/${id}`, updatedData);

            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category._id === id ? response.data : category
                )
            );
        } catch (err) {
            console.error("Error updating category:", err);
        }
    };

    // const removeCategory = async (id) => {
    //     try {
    //         const user = JSON.parse(localStorage.getItem("user"));
    //         await axios.delete(`http://localhost:5000/api/categories/${id}?userId=${user.id}`);
    //
    //         setCategories((prevCategories) =>
    //             prevCategories.filter((category) => category._id !== id)
    //         );
    //     } catch (err) {
    //         console.error("Error deleting category:", err);
    //     }
    // };

    const removeCategory = async (id) => {
        try {
            const category = categories.find((c) => c._id === id);
            if (category.name === "Uncategorized") { return; }

            const user = JSON.parse(localStorage.getItem("user"));
            await axios.delete(`http://localhost:5000/api/categories/${id}?userId=${user.id}`);

            setCategories((prevCategories) =>
                prevCategories.filter((category) => category._id !== id)
            );

            fetchNoteLists();
        } catch (err) {
            console.error("❌ Error deleting category:", err);
        }
    };


    const removeAllCategories = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            await axios.delete(`http://localhost:5000/api/categories/all/${user.id}`);

            setCategories([]);
        } catch (err) {
            console.error("Error deleting all categories:", err);
        }
    };

    const getCategoriesLength = () => categories.length;

    const getCategoryById = (id) => {
        return categories.find((c) => c._id === id);
    }

    return (
        <CategoriesContext.Provider value={{ categories, addCategory, updateCategory, removeCategory, removeAllCategories, getCategoriesLength, getCategoryById }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategories = () => useContext(CategoriesContext);
export default CategoriesContext;
