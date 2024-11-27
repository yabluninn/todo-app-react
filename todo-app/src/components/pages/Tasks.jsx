import { useState } from "react";
import { useTaskList } from "../../contexts/TaskListContext";

import "../../styles/Tasks.css";

import TasksListContainer from "../layout/tasks/TasksListContainer";
import CreateTaskModal from "../modals/CreateTaskModal";
import CreateTaskButton from "../ui/CreateTaskButton";

export default function Tasks() {
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);

  const { tasks } = useTaskList();

  const openCreateTaskModal = () => {
    setCreateTaskModalOpen(true);
  };
  const closeCreateTaskModal = () => {
    setCreateTaskModalOpen(false);
  };

  const defaultLists = [
    {
      name: "All",
      color: "rgb(160, 160, 160)",
      tasks: tasks,
    },
    { name: "Today", color: "rgb(130, 130, 255)", tasks: [] },
  ];

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <p className="t-header-title">Tasks</p>
        <button className="t-menu-button">
          <i className="hgi-stroke hgi-settings-02"></i>
        </button>
      </div>
      <CreateTaskButton onClick={openCreateTaskModal} />
      <TasksListContainer list={defaultLists[0]} />
      <TasksListContainer list={defaultLists[1]} />
      {isCreateTaskModalOpen && (
        <CreateTaskModal onClose={closeCreateTaskModal} />
      )}
    </div>
  );
}
