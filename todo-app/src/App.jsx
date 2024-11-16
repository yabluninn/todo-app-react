import "./styles/App.css";
// import Header from "./components/Header";
import NavMenu from "./components/layout/NavMenu";
import Home from "./components/pages/Home";
// import TasksContainer from "./components/TasksContainer";
import { TaskFormProvider } from "./contexts/TaskFormContext";
import { TaskListProvider } from "./contexts/TaskListContext";

function App() {
  return (
    <>
      <TaskFormProvider>
        <TaskListProvider>
          <div className="app">
            <NavMenu />
            <Home />
            {/* <TasksContainer /> */}
          </div>
        </TaskListProvider>
      </TaskFormProvider>
    </>
  );
}

export default App;
