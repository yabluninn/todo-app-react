import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://booxee-server.onrender.com/api",
});

axiosInstance.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;