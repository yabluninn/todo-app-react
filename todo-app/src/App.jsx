import "./App.css";
import Header from "./components/Header";
import TasksContainer from "./components/TasksContainer";
import { TaskFormProvider } from "./contexts/TaskFormContext";
import { TaskListProvider } from "./contexts/TaskListContext";

function App() {
  return (
    <>
      <TaskFormProvider>
        <TaskListProvider>
          <div className="app">
            <Header />
            <TasksContainer />
          </div>
        </TaskListProvider>
      </TaskFormProvider>
    </>
  );
}

export default App;
