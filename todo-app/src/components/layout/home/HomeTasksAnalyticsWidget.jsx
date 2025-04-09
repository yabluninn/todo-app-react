import {useListsContext} from "../../../contexts/ListsContext.jsx";
import {taskService} from "../../../services/TaskService.js";
import {useTranslation} from "react-i18next";

import "../../../styles/home/widgets/HomeTasksAnalyticsWidget.css";

export default function HomeTasksAnalyticsWidget({selectedPeriod}) {
    const { taskLists } = useListsContext();
    const { t } = useTranslation();

    const allTasks = taskLists.flatMap(list => list.tasks);
    const filteredTasks = taskService.filterTasksByPeriod(selectedPeriod, allTasks);
    const totalTasks = filteredTasks.length;
    const completedTasks = filteredTasks.filter(task => task.completed).length;
    const overdueTasks = filteredTasks.filter(task => taskService.checkOverdue(task)).length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <div className="hta-widget">
            <div className="header">
                <p className="title">{t("task-statistics")}</p>
            </div>

            <div className="task-container">
                <div className="hta-data-container">
                    <p className="hta-data-item">{t("total")} <strong
                        style={{marginRight: "20px", color: "black"}}>{totalTasks}</strong></p>
                    <p className="hta-data-item">{t("completed")} <strong
                        style={{marginRight: "20px", color: "black"}}>{completedTasks}</strong></p>
                    <p className="hta-data-item">{t("overdue")} <strong
                        style={{marginRight: "20px", color: "black"}}>{overdueTasks}</strong></p>
                    <p className="hta-data-item">{t("completion_rate")} <strong
                        style={{marginRight: "4px", color: "black"}}>{completionRate + "%"}</strong></p>
                </div>
            </div>
        </div>
    );
}