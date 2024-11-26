import "./styles/App.css";
import NavMenu from "./components/layout/app/NavMenu";
import Home from "./components/pages/Home";
import { TaskListProvider } from "./contexts/TaskListContext";
import { NoteListProvider } from "./contexts/NoteListContext";

function App() {
  return (
    <>
      <TaskListProvider>
        <NoteListProvider>
          <div className="app">
            {/* <SideMenu /> */}
            <NavMenu />
            <Home />
          </div>
        </NoteListProvider>
      </TaskListProvider>
    </>
  );
}

export default App;
