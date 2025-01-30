import "./styles/App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { TaskListProvider } from "./contexts/TaskListContext";
import { NoteListProvider } from "./contexts/NoteListContext";
import { ListsProvider } from "./contexts/ListsContext";

import NavMenu from "./components/layout/app/NavMenu";

import Tasks from "./components/pages/Tasks";
import Home from "./components/pages/Home";
import LandingPage from "./landing/LandingPage";
import LandingSignIn from "./landing/pages/LandingSignIn";
import LandingLogin from "./landing/pages/LandingLogin";
import Notes from "./components/pages/Notes";
import Groups from "./components/pages/Groups";
import {CategoriesProvider} from "./contexts/CategoriesContext.jsx";
import Profile from "./components/pages/Profile.jsx";
import Analytics from "./components/pages/Analytics.jsx";
import Settings from "./components/pages/Settings.jsx";
import Notifications from "./components/pages/Notifications.jsx";

function App() {
  const DEFAULT_APP_URL = "/app";

  const isLandingPage =
    location.pathname === "/" ||
    location.pathname.startsWith("/signup") ||
    location.pathname.startsWith("/login");

  return (
    <Router>
      <ListsProvider>
        <CategoriesProvider>
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
                  <Route path={DEFAULT_APP_URL + "/analytics"} element={<Analytics />} />
                  <Route path={DEFAULT_APP_URL + "/settings"} element={<Settings />} />
                  <Route path={DEFAULT_APP_URL + "/notifications"} element={<Notifications />} />
                  <Route
                      path={DEFAULT_APP_URL + "/groups"}
                      element={<Groups />}
                  />
                  <Route path={DEFAULT_APP_URL + "/profile"} element={<Profile />} />
                </Routes>
              </div>
            </NoteListProvider>
          </TaskListProvider>
        </CategoriesProvider>
      </ListsProvider>
    </Router>
  );
}

export default App;
