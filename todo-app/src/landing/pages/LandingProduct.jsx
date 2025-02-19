import "../../styles/landing/LandingProduct.css";

import { Link } from "react-router-dom";

export default function LandingProduct() {
    return (
        <div className="product-container">
            <div className="product-content">
                <h1 className="product-title">Boost Your Productivity with Booxee</h1>
                <p className="product-description">
                    Booxee is an intelligent task manager designed to help you stay organized, increase efficiency, and gain full control over your daily workflow.
                    Whether you're an individual or a professional, Booxee adapts to your needs, keeping everything structured in one place.
                </p>

                <div className="product-features">
                    <h2>Why Choose Booxee?</h2>

                    <div className="feature">
                        <h3>✅ Customizable Dashboard</h3>
                        <p>Organize your workspace with interactive widgets tailored to your daily routine.</p>
                    </div>
                    <div className="feature">
                        <h3>📝 Task & Notes Integration</h3>
                        <p>Connect your tasks and notes seamlessly, so you never miss important details.</p>
                    </div>
                    <div className="feature">
                        <h3>📊 Advanced Analytics</h3>
                        <p>Track your progress, analyze productivity trends, and optimize your workflow.</p>
                    </div>
                    <div className="feature">
                        <h3>🔔 Smart Notifications</h3>
                        <p>Get timely reminders about upcoming tasks, deadlines, and goals.</p>
                    </div>
                    <div className="feature">
                        <h3>🌎 Sync Across All Devices</h3>
                        <p>Access Booxee from your phone, tablet, or desktop—your data is always with you.</p>
                    </div>
                </div>

                <div className="how-it-works">
                    <h2>How Does It Work?</h2>
                    <div className="steps">
                        <div className="step">
                            <h3>1️⃣ Set Your Goals</h3>
                            <p>Define your daily, weekly, and monthly objectives in a structured way.</p>
                        </div>
                        <div className="step">
                            <h3>2️⃣ Organize & Prioritize</h3>
                            <p>Use our smart task manager to plan and categorize your work effortlessly.</p>
                        </div>
                        <div className="step">
                            <h3>3️⃣ Get Things Done</h3>
                            <p>Receive smart reminders, track your productivity, and achieve your goals.</p>
                        </div>
                    </div>
                </div>

                <div className="testimonials">
                    <h2>What Our Users Say</h2>
                    <div className="testimonial">
                        <p>"I used to struggle with productivity, but Booxee keeps me focused and motivated every day!"</p>
                        <span>- Mark S., Freelancer</span>
                    </div>
                    <div className="testimonial">
                        <p>"The best task manager I’ve ever used. Clean UI, powerful features, and easy to use!"</p>
                        <span>- Jessica T., Entrepreneur</span>
                    </div>
                </div>

                <div className="cta-container">
                    <Link to="/signup" className="cta-button">Get Started for Free</Link>
                    <Link to="/signin" className="cta-secondary">Already have an account? Log in</Link>
                </div>
            </div>
        </div>
    );
}