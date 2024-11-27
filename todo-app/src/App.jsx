import "./styles/App.css";
import NavMenu from "./components/layout/app/NavMenu";
// import Home from "./components/pages/Home";
import { TaskListProvider } from "./contexts/TaskListContext";
import { NoteListProvider } from "./contexts/NoteListContext";
import Tasks from "./components/pages/Tasks";

function App() {
  return (
    <>
      <TaskListProvider>
        <NoteListProvider>
          <div className="app">
            <NavMenu />
            <Tasks />
          </div>
        </NoteListProvider>
      </TaskListProvider>
    </>
  );
}

export default App;
