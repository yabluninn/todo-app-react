class TaskSerive {
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

      const [endHours, endMinutes] = task.endTime.split(":").map(Number);

      const taskEndTime = endHours * 60 + endMinutes;

      return currentTime > taskEndTime;
    }
  };
}

export const taskService = new TaskSerive();
