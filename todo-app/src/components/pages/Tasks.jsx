import { useState } from "react";

import "../../styles/tasks/Tasks.css";

import TasksListContainer from "../layout/tasks/TasksListContainer";
import CreateTaskModal from "../modals/CreateTaskModal";
import CreateButton from "../ui/CreateButton";
import TaskSideSection from "../layout/tasks/TaskSideSection";
import { useListsContext } from "../../contexts/ListsContext";
import {useTranslation} from "react-i18next";

export default function Tasks() {
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [isTaskSideMenuOpen, setTaskSideMenuOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { taskLists } = useListsContext();
  const { t } = useTranslation();

  const openCreateTaskModal = () => setCreateTaskModalOpen(true);
  const closeCreateTaskModal = () => setCreateTaskModalOpen(false);

  const handleEditTask = (task) => {
    if (!task) {
      console.error("Task is undefined");
      return;
    }
    setSelectedTask(task);
    setTaskSideMenuOpen(true);
  };

  const closeTaskSideMenu = () => {
    setTaskSideMenuOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="page-container">
      <div className="tasks-header">
        <div>
          <p className="t-header-title">Tasks</p>
          <p className="t-header-subtitle">
            Here you can manage all your tasks
          </p>
        </div>
      </div>
      <CreateButton title={"New Task"} onClick={openCreateTaskModal} />
      {taskLists &&
        taskLists.map((list) => (
          <TasksListContainer
            key={list._id}
            list={list}
            onTaskSideOpen={handleEditTask}
          />
        ))}
      {isCreateTaskModalOpen && (
        <CreateTaskModal onClose={closeCreateTaskModal} />
      )}
      {isTaskSideMenuOpen && selectedTask && (
        <TaskSideSection task={selectedTask} onClose={closeTaskSideMenu} />
      )}
    </div>
  );
}
