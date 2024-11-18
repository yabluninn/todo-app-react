/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../../styles/VerticalTimeline.css";

const VerticalTimeline = ({ tasks }) => {
  const [currentTimePosition, setCurrentTimePosition] = useState(0);

  // Функция для преобразования времени в долю суток
  const timeToFraction = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60; // Возвращает время в часах с долей
  };

  // Функция для расчёта текущего времени в процентах
  const calculateCurrentTimePosition = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes; // Общее количество минут с начала дня
    return (totalMinutes / (24 * 60)) * 100; // Позиция в процентах
  };

  // Обновляем позицию линии текущего времени каждую минуту
  useEffect(() => {
    const updateTime = () => {
      setCurrentTimePosition(calculateCurrentTimePosition());
    };

    updateTime(); // Инициализация
    const interval = setInterval(updateTime, 60000); // Обновляем каждую минуту

    return () => clearInterval(interval); // Очищаем интервал при размонтировании
  }, []);

  return (
    <div className="timeline">
      {/* Отображение шкалы с интервалами в 4 часа */}
      {Array.from({ length: 6 }, (_, index) => {
        const hour = index * 4; // Начало интервала (0, 4, 8, 12, 16, 20)
        return (
          <div key={hour} className="timeline-hour">
            <div className="timeline-hour-line"></div>
            <span className="timeline-hour-label">{`${hour}:00`}</span>
          </div>
        );
      })}

      {/* Отображение текущего времени */}
      <div
        className="current-time-line"
        style={{ top: `${currentTimePosition}%` }}
      ></div>

      {/* Отображение задач */}
      {tasks.map((task) => {
        const startFraction = timeToFraction(task.startTime);
        const endFraction = timeToFraction(task.endTime);
        const durationFraction = endFraction - startFraction;

        return (
          <div
            key={task.id}
            className="timeline-task"
            style={{
              top: `${(startFraction / 24) * 100}%`,
              height: `${(durationFraction / 24) * 100}%`,
            }}
          >
            <span className="timeline-task-name">{task.name}</span>
            <span className="timeline-task-note">{task.note}</span>
          </div>
        );
      })}
    </div>
  );
};

export default VerticalTimeline;
