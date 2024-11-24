import "./styles/App.css";
import NavMenu from "./components/layout/NavMenu";
import Home from "./components/pages/Home";
import { TaskListProvider } from "./contexts/TaskListContext";

function App() {
  return (
    <>
      <TaskListProvider>
        <div className="app">
          <NavMenu />
          <Home />
        </div>
      </TaskListProvider>
    </>
  );
}

export default App;
