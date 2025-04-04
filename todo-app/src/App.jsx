import "./styles/App.css";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import {NotificationsProvider} from "./contexts/NotificationsContext.jsx";
import NotificationsHandler from "./utils/NotificationsHandler.jsx";

function AppWrapper() {
  return (
      <Router>
        <App />
      </Router>
  );
}

function App() {
  const DEFAULT_APP_URL = "/app";

  const location = useLocation();

  const isLandingPage =
      location.pathname === "/" ||
      location.pathname.startsWith("/signup") ||
      location.pathname.startsWith("/login") ||
      location.pathname.startsWith("/product") ||
      location.pathname.startsWith("/features") ||
      location.pathname.startsWith("/solution") ||
      location.pathname.startsWith("/help") ||
      location.pathname.startsWith("/pricing") ;

  return (
      <ListsProvider>
        <CategoriesProvider>
            <NotificationsProvider>
                <div className="app">
                    {!isLandingPage && <NavMenu/>}
                    <NotificationsHandler />
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/signup" element={<LandingSignIn/>}/>
                        <Route path="/login" element={<LandingLogin/>}/>
                        <Route path="/*" element={<LandingPage/>}/>
                        <Route path={DEFAULT_APP_URL + "/"} element={<Home/>}/>
                        <Route path={DEFAULT_APP_URL + "/tasks"} element={<Tasks/>}/>
                        <Route path={DEFAULT_APP_URL + "/notes"} element={<Notes/>}/>
                        <Route path={DEFAULT_APP_URL + "/analytics"} element={<Analytics/>}/>
                        <Route path={DEFAULT_APP_URL + "/settings"} element={<Settings/>}/>
                        <Route path={DEFAULT_APP_URL + "/notifications"} element={<Notifications/>}/>
                        <Route path={DEFAULT_APP_URL + "/groups"} element={<Groups/>}/>
                        <Route path={DEFAULT_APP_URL + "/profile"} element={<Profile/>}/>
                    </Routes>
                </div>
            </NotificationsProvider>
        </CategoriesProvider>
      </ListsProvider>
  );
}

export default AppWrapper;
