import {useListsContext} from "../../../contexts/ListsContext.jsx";
import {taskService} from "../../../services/TaskService.js";

import "../../../styles/home/widgets/HomeTasksAnalyticsWidget.css"

export default function HomeTasksAnalyticsWidget({selectedPeriod}) {
    const { taskLists } = useListsContext();

    const allTasks = taskLists.flatMap(list => list.tasks);
    const filteredTasks = taskService.filterTasksByPeriod(selectedPeriod, allTasks);
    const totalTasks = filteredTasks.length;
    const completedTasks = filteredTasks.filter(task => task.completed).length;
    const overdueTasks = filteredTasks.filter(task => taskService.checkOverdue(task)).length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <div className="hta-widget">
            <div className="header">
                <p className="title">Tasks Statistics</p>
            </div>

            <div className="task-container">
                <div className="hta-data-container">
                    <p className="hta-data-item">Total <strong
                        style={{marginRight: "20px", color: "black"}}>{totalTasks}</strong></p>
                    <p className="hta-data-item">Completed <strong
                        style={{marginRight: "20px", color: "black"}}>{completedTasks}</strong></p>
                    <p className="hta-data-item">Overdue <strong
                        style={{marginRight: "20px", color: "black"}}>{overdueTasks}</strong></p>
                    <p className="hta-data-item">Completion Rate <strong
                        style={{marginRight: "4px", color: "black"}}>{completionRate + "%"}</strong></p>
                </div>
            </div>
        </div>
    );
}