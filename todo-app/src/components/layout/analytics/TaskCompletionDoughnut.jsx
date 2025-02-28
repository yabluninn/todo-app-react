import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { useState } from "react";
import ContextMenuButton from "../../contextMenus/ContextMenuButton.jsx";
import ContextMenu from "../../contextMenus/ContextMenu.jsx";
import {useListsContext} from "../../../contexts/ListsContext.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

const checkOverdue = (task) => {
    if (!task.completed) {
        const nowTime = new Date();
        const currentTime = nowTime.getHours() * 60 + nowTime.getMinutes();

        const [endHours, endMinutes] = task.endTime.split(":").map(Number);
        const taskEndTime = endHours * 60 + endMinutes;

        return currentTime > taskEndTime;
    }
    return false;
};

const getTasksDataForRange = (tasks, dataRange) => {
    const now = new Date();
    let completed = 0;
    let overdue = 0;

    tasks.forEach(task => {
        const taskDate = new Date(task.date);

        if (dataRange === "Today") {
            if (taskDate.toDateString() === now.toDateString()) {
                task.completed ? completed++ : checkOverdue(task) && overdue++;
            }
        } else if (dataRange === "Week") {
            const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(endOfWeek.getDate() + 6);

            if (taskDate >= startOfWeek && taskDate <= endOfWeek) {
                task.completed ? completed++ : checkOverdue(task) && overdue++;
            }
        } else if (dataRange === "Month") {
            if (taskDate.getMonth() === now.getMonth() && taskDate.getFullYear() === now.getFullYear()) {
                task.completed ? completed++ : checkOverdue(task) && overdue++;
            }
        }
    });

    return [completed, overdue];
};

const TaskCompletionDoughnut = () => {
    const [dataRange, setDataRange] = useState("Today");
    const [menuVisible, setMenuVisible] = useState(false);
    const { taskLists } = useListsContext();

    const allTasks = taskLists.flatMap(list => list.tasks);

    const [completedTasks, overdueTasks] = getTasksDataForRange(allTasks, dataRange);

    const data = {
        labels: ["Completed", "Overdue"],
        datasets: [
            {
                data: [completedTasks, overdueTasks],
                backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const value = tooltipItem.raw;
                        const total = completedTasks + overdueTasks;
                        const percentage = total ? ((value / total) * 100).toFixed(1) : 0;
                        return `${value} tasks (${percentage}%)`;
                    },
                },
            },
        },
        maintainAspectRatio: false,
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <div className="a-g-block">
            <div className="a-tib-header">
                <p className="a-tibh-title">Task Completion Status</p>
                <button onClick={toggleMenu} className="a-tib-button">
                    {dataRange}
                    <i className="hgi-stroke hgi-arrow-down-01"></i>
                </button>
                {menuVisible && (
                    <ContextMenu
                        position={{ top: "390px", left: "1285px" }}
                        toggleVisibility={() => setMenuVisible(false)}
                    >
                        <ContextMenuButton
                            title="Today"
                            onClick={() => {
                                setDataRange("Today");
                                setMenuVisible(false);
                            }}
                            icon="hgi-stroke hgi-calendar-01"
                        />
                        <ContextMenuButton
                            title="Week"
                            onClick={() => {
                                setDataRange("Week");
                                setMenuVisible(false);
                            }}
                            icon="hgi-stroke hgi-calendar-03"
                        />
                        <ContextMenuButton
                            title="Month"
                            onClick={() => {
                                setDataRange("Month");
                                setMenuVisible(false);
                            }}
                            icon="hgi-stroke hgi-calendar-02"
                        />
                    </ContextMenu>
                )}
            </div>
            <div style={{ height: "250px", width: "250px", margin: "0 auto" }}>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default TaskCompletionDoughnut;
