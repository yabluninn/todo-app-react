import Header from "../layout/Header";
import HomeTasksWidget from "../layout/home/HomeTasksWidget";
// import CreateButton from "../ui/CreateButton";
import "../../styles/Home.css";
import VerticalTimeline from "../layout/VerticalTimeline";
import HomeNoteWidget from "../layout/home/HomeNoteWidget";
import HomeAddWidget from "../layout/home/HomeAddWidget";
import CreateTaskModal from "../modals/CreateTaskModal";
import { useState } from "react";
import { useTaskList } from "../../contexts/TaskListContext";

export default function Home() {
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const { tasks } = useTaskList();

  const openCreateTaskModal = () => {
    setCreateTaskModalOpen(true);
  };
  const closeCreateTaskModal = () => {
    setCreateTaskModalOpen(false);
  };

  // const testTasks = [];

  // const testTask = {
  //   id: 0,
  //   name: "Test Task",
  //   completed: false,
  //   startTime: "09:00",
  //   endTime: "16:00",
  //   note: "Abc",
  // };

  // const testTwoTask = {
  //   id: 1,
  //   name: "Test Task 2",
  //   completed: false,
  //   startTime: "16:30",
  //   endTime: "18:30",
  //   note: "",
  // };

  // testTasks.push(testTask);
  // testTasks.push(testTwoTask);

  return (
    <div className="page-container">
      <Header onOpenCreateTaskModal={openCreateTaskModal} />
      <div className="page-app-container">
        <div className="page-app-widgets">
          <HomeTasksWidget />
          <HomeNoteWidget />
          <HomeAddWidget />
        </div>
        <div className="home-day-overview">
          <p className="home-day-overview-title">Day Overview</p>
          <VerticalTimeline tasks={tasks} />
        </div>
      </div>
      {isCreateTaskModalOpen && (
        <CreateTaskModal onClose={closeCreateTaskModal} />
      )}
    </div>
  );
}
