import ContextMenu from "../../contextMenus/ContextMenu.jsx";
import ContextMenuButton from "../../contextMenus/ContextMenuButton.jsx";
import {useState} from "react";

export default function TasksCompletionBlock() {
    const [tasksMenuVisible, setTasksMenuVisible] = useState(false);

    const tasksContextMenuPos = {
        top: "250px",
        left: "725px",
    }

    return (
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
    )
}