import {useListsContext} from "../../../contexts/ListsContext.jsx";
import {taskService} from "../../../services/TaskService.js";

import "../../../styles/home/widgets/HomeTasksAnalyticsWidget.css"
import {useState} from "react";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import {Line} from "react-chartjs-2";
import {useTranslation} from "react-i18next";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const getLast7Days = (locale) => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        days.push(date.toLocaleDateString(locale, { day: "numeric", month: "short" }));
    }
    return days;
};

const getLast7Weeks = (t, locale) => {
    const weeks = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i * 7);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        const formattedDate = weekStart.toLocaleDateString(locale, { month: "short", day: "numeric" });
        weeks.push(t("week_of", { date: formattedDate }));
    }
    return weeks;
};

const getLast7Months = (locale) => {
    const months = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setMonth(today.getMonth() - i);
        months.push(date.toLocaleDateString(locale, { month: "long", year: "numeric" }));
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

export default function HomeRecentTaskCompletionWidget({selectedPeriod}) {
    const { taskLists } = useListsContext();
    const { t, i18n } = useTranslation();

    const allTasks = taskLists?.flatMap(list => list.tasks) || [];
    const completedTasks = allTasks.filter(task => task.completed && task.date);

    const locale = i18n.language === "ua" ? "uk-UA" : "en-US";

    const labels =
        selectedPeriod === "Today"
            ? getLast7Days(locale)
            : selectedPeriod === "Week"
                ? getLast7Weeks(t, locale)
                : getLast7Months(locale);

    const dataValues = labels.map(label => {
        return completedTasks.filter(task => {
            if (!task.date) return false;
            const taskDate = new Date(task.date);
            if (isNaN(taskDate)) return false;

            if (selectedPeriod === "Today") {
                return label === taskDate.toLocaleDateString("en-US", { day: "numeric", month: "short" });
            } else if (selectedPeriod === "Week") {
                const weekStart = new Date();
                weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                return label.includes(weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
            } else if (selectedPeriod === "Month") {
                return label.includes(taskDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }));
            }
            return false;
        }).length;
    });

    const data = {
        labels,
        datasets: [
            {
                label: t("tasks_completed"),
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
        maintainAspectRatio: false,
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

    return (
        <div className="hta-widget">
            <div className="header">
                <p className="title">{t("recent_completion_curve")}</p>
            </div>

            <div className="ht-chart-container">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
