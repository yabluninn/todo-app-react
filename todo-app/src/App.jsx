import "./App.css";
import Header from "./components/Header";
import TasksContainer from "./components/TasksContainer";
import { TaskFormProvider } from "./contexts/TaskFormContext";

function App() {
  return (
    <>
      <TaskFormProvider>
        <div className="app">
          <Header />
          <TasksContainer />
        </div>
      </TaskFormProvider>
    </>
  );
}

export default App;
