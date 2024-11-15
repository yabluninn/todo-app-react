import Header from "../Header";
import TasksContainer from "../TasksContainer";
import CreateButton from "../ui/CreateButton";
import "./Home.css";

export default function Home() {
  return (
    <div className="page-container">
      <Header />
      <TasksContainer />
      <CreateButton />
    </div>
  );
}
