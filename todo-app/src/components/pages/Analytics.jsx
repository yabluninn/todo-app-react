import "../../styles/Analytics.css";
import RecentCompletionCurve from "../layout/analytics/RecentCompletionCurve.jsx";
import TaskCompletionDoughnut from "../layout/analytics/TaskCompletionDoughnut.jsx";
import TasksCompletionBlock from "../layout/analytics/TasksCompletionBlock.jsx";
import {useListsContext} from "../../contexts/ListsContext.jsx";
import {taskService} from "../../services/TaskService.js";
import {useTranslation} from "react-i18next";

export default function Analytics() {

    const { taskLists, noteLists } = useListsContext();

    const { t } = useTranslation();

    const totalTasks = taskLists.reduce((acc, list) => acc + list.tasks.length, 0);
    const totalNotes = noteLists.reduce((acc, list) => acc + list.notes.length, 0);

    const completedTasks = taskLists.reduce(
        (acc, list) => acc + list.tasks.filter(task => task.completed).length,
        0
    );

    const overdueTasks = taskLists.reduce(
        (acc, list) => acc + list.tasks.filter(task => taskService.checkOverdue(task)).length,
        0
    );

    const taskListsCount = taskLists.length;
    const noteListsCount = noteLists.length;


    return (
        <div className="page-container">
            <div className="analytics-header">
                <div>
                    <p className="a-header-title">{t("analytics")}</p>
                    <p className="a-header-subtitle">{t("analytics_subtitle")}</p>
                </div>
            </div>
            <div className="a-data-container">
                <div className="a-overview-block">
                    <p><strong style={{ marginRight: "4px", color: "black" }}>{totalTasks}</strong> {t("tasks_label")}</p>
                    <p><strong style={{ marginRight: "4px", color: "black" }}>{completedTasks}</strong> {t("completed_label")}</p>
                    <p><strong style={{ marginRight: "4px", color: "black" }}>{overdueTasks}</strong> {t("overdue_label")}</p>
                    <p><strong style={{ marginRight: "4px", color: "black" }}>{taskListsCount}</strong> {t("task_lists_label")}</p>
                    <p><strong style={{ marginRight: "4px", color: "black" }}>{noteListsCount}</strong> {t("note_lists_label")}</p>
                </div>

                <TasksCompletionBlock />

                <div className="a-textinfo-block">
                    <div className="a-tib-header">
                        <p className="a-tibh-title">{t("notes")}</p>
                        <button className="a-tib-button" style={{ scale: "0" }}>
                            Today
                            <i className="hgi-stroke hgi-arrow-down-01"></i>
                        </button>
                    </div>
                    <div className="a-tib-data">
                        <p><strong style={{ marginRight: "4px", color: "black" }}>{totalNotes}</strong> {t("total_label")}</p>
                    </div>
                </div>

                <div className="a-graphs-block">
                    <RecentCompletionCurve />
                    <TaskCompletionDoughnut />
                </div>
            </div>
        </div>
    );
}