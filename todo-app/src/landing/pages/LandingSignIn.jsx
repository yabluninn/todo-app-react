import "../../styles/landing/LandingSignIn.css";

import axios from "axios";
import {useState} from "react";

export default function LandingSignIn() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Обновление состояния при вводе данных
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Обработка отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Отправка данных на сервер
            const response = await axios.post("http://localhost:5000/api/auth/register", formData);
            setSuccess(true);
            setError(""); // Очистка ошибок при успехе
            console.log("Registration successful:", response.data);
        } catch (err) {
            // Обработка ошибок
            if (err.response) {
                setError(err.response.data.message || "Registration failed");
            } else {
                setError("Server error, please try again later.");
            }
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>Registration successful!</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" style={{ padding: "10px 20px" }}>Register</button>
            </form>
        </div>
    );
}
