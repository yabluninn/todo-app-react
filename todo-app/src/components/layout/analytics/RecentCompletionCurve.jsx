import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useState } from "react";
import ContextMenuButton from "../../contextMenus/ContextMenuButton.jsx";
import ContextMenu from "../../contextMenus/ContextMenu.jsx";
import {useListsContext} from "../../../contexts/ListsContext.jsx";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const getLast7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        days.push(date.toLocaleDateString("en-US", { day: "numeric", month: "short" }));
    }
    return days;
};

const getLast7Weeks = () => {
    const weeks = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i * 7);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        weeks.push(`Week of ${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`);
    }
    return weeks;
};

const getLast7Months = () => {
    const months = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setMonth(today.getMonth() - i);
        months.push(date.toLocaleDateString("en-US", { month: "long", year: "numeric" }));
    }
    return months;
};

const getTasksCompletedInRange = (tasks, dataRange) => {
    const now = new Date();
    let filteredTasks = [];

    if (dataRange === "Today") {
        filteredTasks = tasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate.toDateString() === now.toDateString();
        });
    } else if (dataRange === "Week") {
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);

        filteredTasks = tasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate >= startOfWeek && taskDate <= endOfWeek;
        });
    } else if (dataRange === "Month") {
        filteredTasks = tasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate.getMonth() === now.getMonth() && taskDate.getFullYear() === now.getFullYear();
        });
    }

    return filteredTasks.length;
};

const RecentCompletionCurve = () => {
    const [dataRange, setDataRange] = useState("Today");
    const [menuVisible, setMenuVisible] = useState(false);
    const { taskLists } = useListsContext();

    const allTasks = taskLists.flatMap(list => list.tasks);
    const completedTasks = allTasks.filter(task => task.completed && task.date); // Только завершенные

    const labels =
        dataRange === "Today"
            ? getLast7Days()
            : dataRange === "Week"
                ? getLast7Weeks()
                : getLast7Months();

    const dataValues = labels.map(() => getTasksCompletedInRange(completedTasks, dataRange));

    const data = {
        labels,
        datasets: [
            {
                label: "Tasks Completed",
                data: dataValues,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 2,
                },
            },
        },
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <div className="a-g-block">
            <div className="a-tib-header">
                <p className="a-tibh-title">Recent Completion Curve</p>
                <button onClick={toggleMenu} className="a-tib-button">
                    {dataRange}
                    <i className="hgi-stroke hgi-arrow-down-01"></i>
                </button>
                {menuVisible && (
                    <ContextMenu
                        position={{ top: "390px", left: "725px" }}
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
            <Line data={data} options={options} />
        </div>
    );
};

export default RecentCompletionCurve;
