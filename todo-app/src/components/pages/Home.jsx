import Header from "../layout/Header";
import TasksContainer from "../layout/TasksContainer";
import CreateButton from "../ui/CreateButton";
import "../../styles/Home.css";

export default function Home() {
  return (
    <div className="page-container">
      <Header />
      <TasksContainer />
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
