import { useState } from "react";
import { useTaskList } from "../../contexts/TaskListContext";

import Header from "../layout/Header";
import HomeTasksWidget from "../layout/home/HomeTasksWidget";
import "../../styles/Home.css";
import VerticalTimeline from "../layout/VerticalTimeline";
import HomeNoteWidget from "../layout/home/HomeNoteWidget";
import HomeAddWidget from "../layout/home/HomeAddWidget";
import CreateTaskModal from "../modals/CreateTaskModal";
import CreateNoteModal from "../modals/CreateNoteModal";

export default function Home() {
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [isCreateNoteModalOpen, setCreateNoteModalOpen] = useState(false);

  const { tasks } = useTaskList();

  const openCreateTaskModal = () => {
    setCreateTaskModalOpen(true);
  };
  const closeCreateTaskModal = () => {
    setCreateTaskModalOpen(false);
  };

  const openCreateNoteModal = () => {
    setCreateNoteModalOpen(true);
  };
  const closeCreateNoteModal = () => {
    setCreateNoteModalOpen(false);
  };

  return (
    <div className="page-container">
      <Header
        onOpenCreateTaskModal={openCreateTaskModal}
        onOpenCreateNoteModal={openCreateNoteModal}
      />
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
      {isCreateNoteModalOpen && (
        <CreateNoteModal onClose={closeCreateNoteModal} />
      )}
    </div>
  );
}
