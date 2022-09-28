import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import { getAllClasses } from "./store/class";
import { getAllDecks } from "./store/deck";
import { getAllCards } from "./store/card";
import ClassList from "./components/ClassList";
import ClassDetails from "./components/ClassDetails";
import DeckDetails from "./components/DeckDetails";
import SplashPage from "./components/SplashPage";
import LogoutButton from "./components/auth/LogoutButton";
import Dashboard from "./components/Dashboard";
function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());

      // Temporary to test backend/state
      await dispatch(getAllClasses());
      await dispatch(getAllDecks());
      await dispatch(getAllCards());

      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {!user && <NavBar />}
      {/* Render Sidebar here (for dashboard) */}
      <Switch>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        {/* BACKEND TESTING ROUTES */}
        <ProtectedRoute path="/dashboard/:classId" exact={true}>
          <ClassDetails />
        </ProtectedRoute>
        <ProtectedRoute path="/dashboard/:classId/decks/:deckId" exact={true}>
          <DeckDetails />
        </ProtectedRoute>
        <Route path="/" exact>
          <SplashPage />
        </Route>
        <ProtectedRoute path="/dashboard">
          <Dashboard />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
