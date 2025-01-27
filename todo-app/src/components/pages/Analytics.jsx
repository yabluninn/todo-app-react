import "../../styles/Analytics.css";
import RecentCompletionCurve from "../layout/analytics/RecentCompletionCurve.jsx";
import TaskCompletionDoughnut from "../layout/analytics/TaskCompletionDoughnut.jsx";
import {useState} from "react";
import ContextMenu from "../contextMenus/ContextMenu.jsx";
import ContextMenuButton from "../contextMenus/ContextMenuButton.jsx";

export default function Analytics() {
    const [tasksMenuVisible, setTasksMenuVisible] = useState(false);

    const tasksContextMenuPos = {
        top: "250px",
        left: "725px",
    }


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
                <div className="a-textinfo-block">
                    <div className="a-tib-header">
                        <p className="a-tibh-title">Tasks</p>
                        <button className="a-tib-button" onClick={() => setTasksMenuVisible(true)}>
                            Today
                            <i className="hgi-stroke hgi-arrow-down-01"></i>
                        </button>
                    </div>
                    <div className="a-tib-data">
                    <p><strong style={{marginRight: "4px", color: "black"}}>12</strong> Total</p>
                        <p><strong style={{marginRight: "4px", color: "black"}}>5</strong> Completed</p>
                        <p><strong style={{marginRight: "4px", color: "black"}}>1</strong> Overdue</p>
                        <p><strong style={{marginRight: "4px", color: "black"}}>25%</strong> Completion Rate</p>
                    </div>
                    {tasksMenuVisible && (
                        <ContextMenu
                            position={tasksContextMenuPos}
                            toggleVisibility={() => setTasksMenuVisible(false)}
                        >
                            <ContextMenuButton
                                title="Today"
                                onClick={() => {
                                    // setDataRange("Today");
                                    setTasksMenuVisible(false);
                                }}
                                icon="hgi-stroke hgi-calendar-01"
                            />
                            <ContextMenuButton
                                title="Week"
                                onClick={() => {
                                    // setDataRange("Week");
                                    setTasksMenuVisible(false);
                                }}
                                icon="hgi-stroke hgi-calendar-03"
                            />
                            <ContextMenuButton
                                title="Month"
                                onClick={() => {
                                    // setDataRange("Month");
                                    setTasksMenuVisible(false);
                                }}
                                icon="hgi-stroke hgi-calendar-02"
                            />
                        </ContextMenu>
                    )}
                </div>
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