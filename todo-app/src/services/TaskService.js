class TaskService {
  checkCurrentTimeInRange = (task) => {
    const nowTime = new Date();
    const currentTime = nowTime.getHours() * 60 + nowTime.getMinutes();

    const [startHours, startMinutes] = task.startTime.split(":").map(Number);
    const [endHours, endMinutes] = task.endTime.split(":").map(Number);

    const taskStartTime = startHours * 60 + startMinutes;
    const taskEndTime = endHours * 60 + endMinutes;

    return currentTime >= taskStartTime && currentTime <= taskEndTime;
  };

  checkOverdue = (task) => {
    if (!task.completed) {
      const nowTime = new Date();
      const currentTime = nowTime.getHours() * 60 + nowTime.getMinutes();

      if (!task.endTime) return false;

      const [endHours, endMinutes] = task.endTime.split(":").map(Number);
      const taskEndTime = endHours * 60 + endMinutes;

      return currentTime > taskEndTime;
    }
    return false;
  };

  filterTasksByPeriod = (selectedPeriod, tasks) => {
    const now = new Date();
    return tasks.filter(task => {
      const taskDate = new Date(task.date);
      if (selectedPeriod === "Today") {
        return taskDate.toDateString() === now.toDateString();
      } else if (selectedPeriod === "Week") {
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        return taskDate >= startOfWeek && taskDate <= endOfWeek;
      } else if (selectedPeriod === "Month") {
        return taskDate.getMonth() === now.getMonth() && taskDate.getFullYear() === now.getFullYear();
      }
      return false;
    });
  };
}

export const taskService = new TaskService();
