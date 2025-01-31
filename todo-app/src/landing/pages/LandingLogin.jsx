import "../../styles/landing/LandingLogin.css";

import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LandingLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
            console.log("Login successful:", response.data);
            setFormData({ email: "", password: "" });
            // Логика после успешного входа, например, перенаправление
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

                {/* Ссылка на регистрацию */}
                <p className="register-link">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}