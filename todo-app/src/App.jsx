import "./styles/App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { TaskListProvider } from "./contexts/TaskListContext";
import { NoteListProvider } from "./contexts/NoteListContext";
import { ListsProvider } from "./contexts/ListsContext";

import NavMenu from "./components/layout/app/NavMenu";

import Tasks from "./components/pages/Tasks";
import Home from "./components/pages/Home";
import Lists from "./components/pages/Lists";
import LandingPage from "./landing/LandingPage";
import LandingSignIn from "./landing/pages/LandingSignIn";
import LandingLogin from "./landing/pages/LandingLogin";
import Notes from "./components/pages/Notes";

function App() {
  const DEFAULT_APP_URL = "/app";

  const isLandingPage =
    location.pathname === "/" ||
    location.pathname.startsWith("/signup") ||
    location.pathname.startsWith("/login");

  return (
    <Router>
      <ListsProvider>
        <TaskListProvider>
          <NoteListProvider>
            <div className="app">
              {!isLandingPage && <NavMenu />}
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<LandingSignIn />} />
                <Route path="/login" element={<LandingLogin />} />
                <Route path={DEFAULT_APP_URL + "/"} element={<Home />} />
                <Route path={DEFAULT_APP_URL + "/tasks"} element={<Tasks />} />
                <Route path={DEFAULT_APP_URL + "/notes"} element={<Notes />} />
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
