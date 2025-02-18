import "../../styles/landing/LandingFeatures.css";
import {Link} from "react-router-dom";

export default function LandingFeatures() {
    return (
        <div className="features-container">
            <div className="features-content">
                <h1 className="features-title">Why Choose Booxee?</h1>
                <p className="features-description">
                    Booxee is more than just a task manager. It’s a complete productivity hub designed to make your workflow seamless, efficient, and stress-free.
                </p>

                <div className="feature-category">
                    <h2>📌 Effortless Organization</h2>
                    <div className="feature-item">
                        <h3>✅ Customizable Dashboard</h3>
                        <p>Arrange widgets your way and access all key features in one place.</p>
                    </div>
                    <div className="feature-item">
                        <h3>📝 Smart Notes & Tasks</h3>
                        <p>Combine tasks with notes for a fully integrated experience.</p>
                    </div>
                    <div className="feature-item">
                        <h3>📂 Project & Task Categorization</h3>
                        <p>Organize your tasks with folders, tags, and color-coded priorities.</p>
                    </div>
                </div>

                <div className="feature-category">
                    <h2>🚀 Productivity Boosters</h2>
                    <div className="feature-item">
                        <h3>🔔 Smart Notifications</h3>
                        <p>Get reminders at the right time, ensuring you never miss an important task.</p>
                    </div>
                    <div className="feature-item">
                        <h3>🕒 Time Tracking</h3>
                        <p>Analyze how much time you spend on tasks and improve efficiency.</p>
                    </div>
                    <div className="feature-item">
                        <h3>📊 Productivity Insights</h3>
                        <p>Visual analytics help you understand patterns and optimize workflow.</p>
                    </div>
                </div>

                <div className="feature-category">
                    <h2>🌎 Seamless Connectivity</h2>
                    <div className="feature-item">
                        <h3>📡 Cloud Sync</h3>
                        <p>Access your tasks from any device, anywhere.</p>
                    </div>
                    <div className="feature-item">
                        <h3>🔗 Third-Party Integrations</h3>
                        <p>Connect with Google Calendar, Slack, and other productivity tools.</p>
                    </div>
                    <div className="feature-item">
                        <h3>💻 Multi-Platform Support</h3>
                        <p>Booxee works on web, mobile, and desktop for ultimate flexibility.</p>
                    </div>
                </div>

                <div className="cta-container">
                    <p>Ready to take control of your productivity?</p>
                    <Link to="/signup" className="cta-button">Try Booxee for Free</Link>
                </div>
            </div>
        </div>
    );
}
