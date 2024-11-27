import "../../styles/Tasks.css";
import TasksListContainer from "../layout/tasks/TasksListContainer";
// import ListMenuButton from "../ui/ListMenuButton";
import CreateTaskButton from "../ui/CreateTaskButton";

export default function Tasks() {
  const defaultLists = [
    {
      name: "All",
      color: "rgb(160, 160, 160)",
      tasks: [
        {
          id: 0,
          name: "Test Task",
          completed: false,
          startTime: "15:00",
          endTime: "23:00",
          date: "27.11.2024",
          priority: "None",
        },
        {
          id: 1,
          name: "Test Task Two",
          completed: false,
          startTime: "05:00",
          endTime: "18:00",
          date: "29.11.2024",
          priority: "Medium",
        },
      ],
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
      <CreateTaskButton />
      <TasksListContainer list={defaultLists[0]} />
      <TasksListContainer list={defaultLists[1]} />
    </div>
  );
}
