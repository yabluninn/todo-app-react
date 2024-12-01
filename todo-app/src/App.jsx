import "./styles/App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavMenu from "./components/layout/app/NavMenu";
import { TaskListProvider } from "./contexts/TaskListContext";
import { NoteListProvider } from "./contexts/NoteListContext";

import Tasks from "./components/pages/Tasks";
import Home from "./components/pages/Home";
import Lists from "./components/pages/Lists";
import { ListsProvider } from "./contexts/ListsContext";
import LandingPage from "./landing/LandingPage";

function App() {
  const DEFAULT_APP_URL = "/app";

  const isLandingPage = location.pathname === "/";

  return (
    <Router>
      <ListsProvider>
        <TaskListProvider>
          <NoteListProvider>
            <div className="app">
              {!isLandingPage && <NavMenu />}
              <Routes>
                <Route path="/" element={<LandingPage />} />
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
