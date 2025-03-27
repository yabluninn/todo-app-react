/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../../../styles/home/VerticalTimeline.css";
import { useListsContext } from "../../../contexts/ListsContext";
import {colorExtensions} from "../../../utils/color-extensions.js";

const VerticalTimeline = ({ tasks }) => {
  const [currentTimePosition, setCurrentTimePosition] = useState(0);

  const { getTaskListById } = useListsContext();

  const timeToFraction = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };

  const calculateCurrentTimePosition = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    return (totalMinutes / (24 * 60)) * 100;
  };

  useEffect(() => {
    const updateTime = () => {
      setCurrentTimePosition(calculateCurrentTimePosition());
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timeline">
      {Array.from({ length: 6 }, (_, index) => {
        const hour = index * 4;
        return (
          <div key={hour} className="timeline-hour">
            <div className="timeline-hour-line"></div>
            <span className="timeline-hour-label">{`${hour}:00`}</span>
          </div>
        );
      })}

      <div
        className="current-time-line"
        style={{ top: `${currentTimePosition}%` }}
      ></div>

      {tasks.map((task) => {
        const startFraction = timeToFraction(task.startTime);
        const endFraction = timeToFraction(task.endTime);
        const durationFraction = endFraction - startFraction;

        const list = getTaskListById(task.listId);
        const colorToRgb = colorExtensions.hexToRgb(list.color);
        const listColor = colorExtensions.rgbToRgba(colorToRgb, 0.4);

        return (
          <div
            key={task._id}
            className="timeline-task"
            style={{
              top: `${(startFraction / 24) * 100}%`,
              height: `${(durationFraction / 24) * 100}%`,
              background: `${listColor}`,
              border: `2px solid ${list.color}`,
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
