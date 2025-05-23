import ContextMenu from "../../contextMenus/ContextMenu.jsx";
import ContextMenuButton from "../../contextMenus/ContextMenuButton.jsx";
import {useState} from "react";
import {useListsContext} from "../../../contexts/ListsContext.jsx";
import {taskService} from "../../../services/TaskService.js";
import { useTranslation } from "react-i18next";

export default function TasksCompletionBlock() {
    const [tasksMenuVisible, setTasksMenuVisible] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState("Today");
    const { taskLists } = useListsContext();

    const { t } = useTranslation();

    const tasksContextMenuPos = {
        top: "250px",
        left: "725px",
    }

    const allTasks = taskLists.flatMap(list => list.tasks);
    const filteredTasks = taskService.filterTasksByPeriod(selectedPeriod, allTasks);
    const totalTasks = filteredTasks.length;
    const completedTasks = filteredTasks.filter(task => task.completed).length;
    const overdueTasks = filteredTasks.filter(task => taskService.checkOverdue(task)).length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <div className="a-textinfo-block">
            <div className="a-tib-header">
                <p className="a-tibh-title">{t("tasks")}</p>
                <button className="a-tib-button" onClick={() => setTasksMenuVisible(true)}>
                    {t(selectedPeriod)}
                    <i className="hgi-stroke hgi-arrow-down-01"></i>
                </button>
            </div>
            <div className="a-tib-data">
                <p><strong style={{marginRight: "4px", color: "black"}}>{totalTasks}</strong> {t("total")}</p>
                <p><strong style={{marginRight: "4px", color: "black"}}>{completedTasks}</strong> {t("completed")}</p>
                <p><strong style={{marginRight: "4px", color: "black"}}>{overdueTasks}</strong> {t("overdue")}</p>
                <p><strong style={{marginRight: "4px", color: "black"}}>{completionRate + "%"}</strong> {t("completion_rate")}</p>
            </div>
            {tasksMenuVisible && (
                <ContextMenu
                    position={tasksContextMenuPos}
                    toggleVisibility={() => setTasksMenuVisible(false)}
                >
                    {[t("today"), t("week"), t("month")].map(period => (
                        <ContextMenuButton
                            key={period}
                            title={period}
                            onClick={() => {
                                setSelectedPeriod(period);
                                setTasksMenuVisible(false);
                            }}
                            icon={`hgi-stroke hgi-calendar-${period === t("today") ? "01" : period === t("week") ? "03" : "02"}`}
                        />
                    ))}
                </ContextMenu>
            )}
        </div>
    )
}