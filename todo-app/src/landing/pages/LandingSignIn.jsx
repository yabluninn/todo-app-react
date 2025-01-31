import "../../styles/landing/LandingSignIn.css";

import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LandingSignIn() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
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
        setSuccess(false);

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", formData);
            setSuccess(true);
            console.log("Registration successful:", response.data);
            setFormData({ email: "", username: "", password: "" });
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong, please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Create an Account</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">Registration successful! 🎉</p>}

                <form onSubmit={handleSubmit} className="signup-form">
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
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Choose a username"
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
                            placeholder="Create a password"
                        />
                    </div>
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "Registering..." : "Sign Up"}
                    </button>
                </form>

                <p className="login-link">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
}