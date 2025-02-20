import "../../styles/landing/LandingPricing.css";
import { Link } from "react-router-dom";

export default function LandingPricing() {
    return (
        <div className="pricing-container">
            <div className="pricing-content">
                <h1 className="pricing-title">Booxee is Completely Free!</h1>
                <p className="pricing-description">
                    We believe that productivity tools should be accessible to everyone.
                    Booxee is 100% free to use with all core features unlocked.
                </p>

                <div className="pricing-cards">
                    <div className="pricing-card">
                        <h2>💡 Free Forever</h2>
                        <p className="price">$0/month</p>
                        <ul className="pricing-features">
                            <li>✅ Task & Notes Management</li>
                            <li>✅ Smart Notifications</li>
                            <li>✅ Customizable Dashboard</li>
                            <li>✅ Sync Across Devices</li>
                        </ul>
                        <Link to="/signup" className="pricing-button">Get Started</Link>
                    </div>
                </div>

                <div className="support-section">
                    <h2>❤️ Support Booxee</h2>
                    <p>Love using Booxee? You can support the project and help us keep it free for everyone!</p>
                    <a href="https://www.buymeacoffee.com/booxee" className="support-button" target="_blank" rel="noopener noreferrer">
                        Buy Me a Coffee ☕
                    </a>
                </div>
            </div>
        </div>
    );
}
