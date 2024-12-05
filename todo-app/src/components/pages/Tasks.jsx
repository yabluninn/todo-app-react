import { useState } from "react";

import "../../styles/Tasks.css";

import TasksListContainer from "../layout/tasks/TasksListContainer";
import CreateTaskModal from "../modals/CreateTaskModal";
import CreateButton from "../ui/CreateButton";
import TaskSideSection from "../layout/tasks/TaskSideSection";
import { useListsContext } from "../../contexts/ListsContext";

export default function Tasks() {
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [isTaskSideMenuOpen, setTaskSideMenuOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { taskLists } = useListsContext();

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

  // const defaultLists = [
  //   {
  //     name: "All",
  //     color: "rgb(160, 160, 160)",
  //     tasks: tasks,
  //   },
  //   { name: "Today", color: "rgb(130, 130, 255)", tasks: [] },
  // ];

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <div>
          <p className="t-header-title">Tasks</p>
          <p className="t-header-subtitle">
            Here you can manage all your tasks
          </p>
        </div>
        <button className="t-menu-button">
          <i className="hgi-stroke hgi-settings-02"></i>
        </button>
      </div>
      <CreateButton title={"New Task"} onClick={openCreateTaskModal} />
      {taskLists &&
        taskLists.map((list) => (
          <TasksListContainer
            key={list.id}
            list={list}
            onTaskSideOpen={handleEditTask}
          />
        ))}
      {isCreateTaskModalOpen && (
        <CreateTaskModal onClose={closeCreateTaskModal} />
      )}
      {isTaskSideMenuOpen && selectedTask && (
        <TaskSideSection
          task={selectedTask}
          listName={"All"}
          onClose={closeTaskSideMenu}
        />
      )}
    </div>
  );
}
