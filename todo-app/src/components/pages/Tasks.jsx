import "../../styles/Tasks.css";
import TasksListContainer from "../layout/tasks/TasksListContainer";
// import ListMenuButton from "../ui/ListMenuButton";
import CreateTaskButton from "../ui/CreateTaskButton";

export default function Tasks() {
  const defaultLists = [
    { name: "All", color: "rgb(160, 160, 160)", tasks: "14" },
    { name: "Today", color: "rgb(130, 130, 255)", tasks: "5" },
  ];

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <p className="t-header-title">Tasks</p>
        <button className="t-menu-button">
          <i className="hgi-stroke hgi-settings-02"></i>
        </button>
      </div>
      <CreateTaskButton />
      <TasksListContainer list={defaultLists[0]} />
      <TasksListContainer list={defaultLists[1]} />
    </div>
  );
}
