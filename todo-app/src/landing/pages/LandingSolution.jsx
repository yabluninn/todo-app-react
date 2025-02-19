import "../../styles/landing/LandingSolution.css";

export default function LandingSolution() {
    return (
        <div className="solution-container">
            <div className="solution-content">
                <h1 className="solution-title">How Booxee Solves Your Productivity Challenges</h1>
                <p className="solution-description">
                    Staying organized and productive can be overwhelming. Booxee is designed to eliminate distractions, structure your workflow, and help you achieve more with ease.
                </p>
                
                <div className="solution-section">
                    <h2>❌ Struggling with Overwhelming To-Do Lists?</h2>
                    <p className="problem-description">
                        Managing long task lists can feel chaotic and unstructured, leading to missed deadlines and frustration.
                    </p>
                    <div className="solution-box">
                        <h3>✅ Booxee's Smart Task System</h3>
                        <p>Our dynamic task manager helps you prioritize, break down tasks, and set achievable goals.</p>
                    </div>
                </div>

                <div className="solution-section">
                    <h2>❌ Constantly Forgetting Important Tasks?</h2>
                    <p className="problem-description">
                        Relying on memory alone can result in missed opportunities and unnecessary stress.
                    </p>
                    <div className="solution-box">
                        <h3>✅ Intelligent Notifications</h3>
                        <p>Booxee sends timely reminders based on deadlines and urgency, ensuring you never forget a task again.</p>
                    </div>
                </div>

                <div className="solution-section">
                    <h2>❌ Feeling Unproductive and Unmotivated?</h2>
                    <p className="problem-description">
                        A lack of structure and clear objectives can make you feel lost and unproductive.
                    </p>
                    <div className="solution-box">
                        <h3>✅ Productivity Insights</h3>
                        <p>Track your progress, analyze trends, and get actionable suggestions to improve your workflow.</p>
                    </div>
                </div>

                <div className="solution-section">
                    <h2>❌ Tasks Scattered Across Different Apps?</h2>
                    <p className="problem-description">
                        Using multiple tools for notes, tasks, and reminders makes it difficult to stay organized.
                    </p>
                    <div className="solution-box">
                        <h3>✅ All-in-One Solution</h3>
                        <p>Booxee combines task management, note-taking, and analytics in one seamless platform.</p>
                    </div>
                </div>

                <div className="solution-section">
                    <h2>❌ Struggling to Maintain Work-Life Balance?</h2>
                    <p className="problem-description">
                        Poor time management can lead to burnout and difficulty separating work from personal life.
                    </p>
                    <div className="solution-box">
                        <h3>✅ Smart Scheduling</h3>
                        <p>Plan work and personal tasks efficiently, ensuring you maintain a healthy balance.</p>
                    </div>
                </div>

                {/* CTA */}
                <div className="cta-container">
                    <p>Take control of your productivity today.</p>
                    <a href="/signup" className="cta-button">Start for Free</a>
                </div>
            </div>
        </div>
    );
}
