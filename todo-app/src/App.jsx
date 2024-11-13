import "./App.css";
import Header from "./components/Header";
import TasksContainer from "./components/TasksContainer";

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <TasksContainer />
      </div>
    </>
  );
}

export default App;
