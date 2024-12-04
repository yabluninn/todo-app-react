import "./styles/App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavMenu from "./components/layout/app/NavMenu";
import { TaskListProvider } from "./contexts/TaskListContext";
import { NoteListProvider } from "./contexts/NoteListContext";

import Tasks from "./components/pages/Tasks";
import Home from "./components/pages/Home";
import Lists from "./components/pages/Lists";
import { ListsProvider } from "./contexts/ListsContext";

function App() {
  const DEFAULT_APP_URL = "/app";

  return (
    <Router>
      <ListsProvider>
        <TaskListProvider>
          <NoteListProvider>
            <div className="app">
              <NavMenu />
              <Routes>
                <Route path={DEFAULT_APP_URL + "/"} element={<Home />} />
                <Route path={DEFAULT_APP_URL + "/tasks"} element={<Tasks />} />
                <Route path={DEFAULT_APP_URL + "/lists"} element={<Lists />} />
              </Routes>
            </div>
          </NoteListProvider>
        </TaskListProvider>
      </ListsProvider>
    </Router>
  );
}

export default App;
