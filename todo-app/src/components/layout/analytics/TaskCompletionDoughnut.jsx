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

ChartJS.register(ArcElement, Tooltip, Legend);

const generateRandomData = (length = 2) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 15)); // Генерация случайных данных
};

const TaskCompletionDoughnut = () => {
    const [dataRange, setDataRange] = useState("Today");
    const [menuVisible, setMenuVisible] = useState(false);
    const contextMenuPos = {
        top: "390px",
        left: "1285px",
    };

    // Генерация данных в зависимости от выбранного диапазона
    const dataValues =
        dataRange === "Today"
            ? generateRandomData()
            : dataRange === "Week"
                ? generateRandomData()
                : generateRandomData();

    const data = {
        labels: ["Completed", "Overdue"],
        datasets: [
            {
                data: dataValues,
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
                        const total = dataValues.reduce((sum, val) => sum + val, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
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
            <div style={{ height: "250px", width: "250px", margin: "0 auto" }}>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default TaskCompletionDoughnut;