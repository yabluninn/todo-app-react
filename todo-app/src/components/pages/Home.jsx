import Header from "../layout/Header";
import TasksContainer from "../layout/TasksContainer";
import CreateButton from "../ui/CreateButton";
import "../../styles/Home.css";
import VerticalTimeline from "../layout/VerticalTimeline";

export default function Home() {
  const testTasks = [];

  const testTask = {
    id: 0,
    name: "Test Task",
    completed: false,
    startTime: "09:00",
    endTime: "16:00",
    note: "Abc",
  };

  const testTwoTask = {
    id: 1,
    name: "Test Task 2",
    completed: false,
    startTime: "16:30",
    endTime: "18:30",
    note: "",
  };

  testTasks.push(testTask);
  testTasks.push(testTwoTask);

  return (
    <div className="page-container">
      <Header />
      <div className="page-app-container">
        <TasksContainer />
        <VerticalTimeline tasks={testTasks} />
      </div>
      <div className="home-footer">
        <CreateButton />
        <div className="home-hints-block">
          <div className="home-hint">
            <div className="home-hint-ct"></div>
            <p>Current task</p>
          </div>
          <div className="home-hint">
            <div className="home-hint-cct"></div>
            <p>Overdue task</p>
          </div>
        </div>
      </div>
    </div>
  );
}
