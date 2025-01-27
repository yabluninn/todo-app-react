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
import {useState} from "react";
import ContextMenuButton from "../../contextMenus/ContextMenuButton.jsx";
import ContextMenu from "../../contextMenus/ContextMenu.jsx";

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
        days.push(date.toLocaleDateString("en-US", { day: "numeric", month: "short" })); // Формат: "25 Jan"
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
        weekStart.setDate(date.getDate() - date.getDay()); // Начало недели
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
        months.push(date.toLocaleDateString("en-US", { month: "long", year: "numeric" })); // Формат: "January 2023"
    }
    return months;
};

const generateRandomData = (length = 7) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 15)); // Генерация случайных данных
};

const RecentCompletionCurve = () => {
    const [dataRange, setDataRange] = useState("Today"); // Диапазон данных
    const [menuVisible, setMenuVisible] = useState(false);
    const contextMenuPos = {
        top: "390px",
        left: "725px",
    }

    // Определение меток и данных на основе выбранного диапазона
    const labels =
        dataRange === "Today"
            ? getLast7Days()
            : dataRange === "Week"
                ? getLast7Weeks()
                : getLast7Months();

    const dataValues = generateRandomData(labels.length);

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
                        position={contextMenuPos}
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