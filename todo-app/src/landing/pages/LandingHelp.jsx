import "../../styles/landing/LandingHelp.css";

export default function LandingHelp() {
    return (
        <div className="help-container">
            <div className="help-content">
                <h1 className="help-title">Need Help? We’ve Got You Covered!</h1>
                <p className="help-description">
                    Whether you have questions about Booxee or need technical support, we’re here to assist you.
                </p>

                <div className="faq-section">
                    <h2>📌 Frequently Asked Questions</h2>

                    <div className="faq-item">
                        <h3>❓ How do I create a new task?</h3>
                        <p>Simply click the "Add Task" button on your dashboard, enter the details, and set a deadline.</p>
                    </div>

                    <div className="faq-item">
                        <h3>❓ Can I sync my tasks across devices?</h3>
                        <p>Yes! Booxee automatically syncs your tasks so you can access them anywhere.</p>
                    </div>

                    <div className="faq-item">
                        <h3>❓ Is Booxee free to use?</h3>
                        <p>We offer a free version with essential features. For advanced tools, you can upgrade to Booxee Pro.</p>
                    </div>

                    <div className="faq-item">
                        <h3>❓ How do I reset my password?</h3>
                        <p>You can reset your password by clicking “Forgot Password” on the login page.</p>
                    </div>

                    <div className="faq-item">
                        <h3>❓ Can I integrate Booxee with other apps?</h3>
                        <p>Yes! We support integrations with Google Calendar, Slack, and other productivity tools.</p>
                    </div>
                </div>
                
                <div className="contact-section">
                    <h2>📩 Contact Our Support Team</h2>
                    <p>If you need further assistance, feel free to reach out to us. Our team is available 24/7.</p>
                    <a href="mailto:support@booxee.com" className="contact-button">Contact Us</a>
                </div>
            </div>
        </div>
    );
}
