import "../../styles/Analytics.css";
import RecentCompletionCurve from "../layout/analytics/RecentCompletionCurve.jsx";
import TaskCompletionDoughnut from "../layout/analytics/TaskCompletionDoughnut.jsx";
import TasksCompletionBlock from "../layout/analytics/TasksCompletionBlock.jsx";

export default function Analytics() {


    return (
        <div className="analytics-container">
            <div className="analytics-header">
                <div>
                    <p className="a-header-title">Analytics</p>
                    <p className="a-header-subtitle">
                        Track your progress, habits, and tasks with detailed analytics to optimize your workflow
                    </p>
                </div>
            </div>
            <div className="a-overview-block">
                <p><strong style={{marginRight: "4px", color: "black"}}>50</strong> Tasks</p>
                <p><strong style={{marginRight: "4px", color: "black"}}>13</strong> Completed</p>
                <p><strong style={{marginRight: "4px", color: "black"}}>2</strong> Overdue</p>
                <p><strong style={{marginRight: "4px", color: "black"}}>10</strong> Task Lists</p>
                <p><strong style={{marginRight: "4px", color: "black"}}>4</strong> Note Lists</p>
            </div>
            <div className="a-data-container">
                <TasksCompletionBlock/>
                <div className="a-textinfo-block">
                    <div className="a-tib-header">
                        <p className="a-tibh-title">Notes</p>
                        <button className="a-tib-button" style={{scale: "0"}}>
                            Today
                            <i className="hgi-stroke hgi-arrow-down-01"></i>
                        </button>
                    </div>
                    <div className="a-tib-data">
                        <p><strong style={{marginRight: "4px", color: "black"}}>12</strong> Total</p>
                    </div>
                </div>
            </div>
            <div className="a-data-container">
                <RecentCompletionCurve/>
                <TaskCompletionDoughnut/>
            </div>
        </div>
    )
}