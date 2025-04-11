import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import "../../styles/landing/LandingLogin.css";


export default function LandingLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Хук для редиректа

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", formData);

            // Сохранение токена и данных пользователя
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            console.log("Login successful:", response.data);

            // Перенаправление на главную страницу
            navigate("/app/");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Sign In</h2>
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "Logging in..." : "Sign In"}
                    </button>
                </form>

                <p className="register-link">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}
