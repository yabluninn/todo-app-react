import { FILTER_ACTIONS } from "../constants/filter-actions";
import { SORTING_ACTIONS } from "../constants/sorting-actions";

class TaskActionsService {
  sort(tasks, condition) {
    if (condition === SORTING_ACTIONS.EARLY_FIRST) {
      return tasks.slice().sort((a, b) => {
        const [aHours, aMinutes] = a.endTime.split(":").map(Number);
        const [bHours, bMinutes] = b.endTime.split(":").map(Number);

        const aTotalMinutes = aHours * 60 + aMinutes;
        const bTotalMinutes = bHours * 60 + bMinutes;

        return aTotalMinutes - bTotalMinutes;
      });
    } else if (condition === SORTING_ACTIONS.LATELY_FIRST) {
      return tasks.slice().sort((a, b) => {
        const [aHours, aMinutes] = a.endTime.split(":").map(Number);
        const [bHours, bMinutes] = b.endTime.split(":").map(Number);

        const aTotalMinutes = aHours * 60 + aMinutes;
        const bTotalMinutes = bHours * 60 + bMinutes;

        return bTotalMinutes - aTotalMinutes;
      });
    } else if (condition === SORTING_ACTIONS.COMPLETED_FIRST) {
      return tasks.slice().sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? -1 : 1;
      });
    } else if (condition === SORTING_ACTIONS.UNCOMPLETED_FIRST) {
      return tasks.slice().sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      });
    } else if (condition === SORTING_ACTIONS.HIGH_PRIORITY_FIRST) {
      const priorityOrder = ["High", "Medium", "Low", "None"];
      return tasks.slice().sort((a, b) => {
        const priorityA = priorityOrder.indexOf(a.priority || "None");
        const priorityB = priorityOrder.indexOf(b.priority || "None");
        return priorityA - priorityB;
      });
    }
  }

  filter(tasks, condition) {
    if (condition === FILTER_ACTIONS.SHOW_COMPLETED) {
      return tasks.filter((task) => task.completed);
    } else if (condition === FILTER_ACTIONS.SHOW_UNCOMPLETED) {
      return tasks.filter((task) => !task.completed);
    } else if (condition === FILTER_ACTIONS.SHOW_OVERDUE) {
      return tasks.filter((task) => task.overdue);
    }
  }
}

export const taskActionsService = new TaskActionsService();
