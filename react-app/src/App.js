import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import { getAllClasses } from "./store/class";
import { getAllDecks } from "./store/deck";
import { getAllCards } from "./store/card";
import ClassForm from "./components/ClassForm";
import ClassList from "./components/ClassList";
import ClassDetails from "./components/ClassDetails";
import DeckDetails from "./components/DeckDetails";
function App() {
  const [loaded, setLoaded] = useState(false);
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
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        {/* BACKEND TESTING ROUTES */}
        <ProtectedRoute path="/classes" exact={true}>
          <h1>TEMPORARY CLASS LIST</h1>
          <ClassList />
        </ProtectedRoute>
        <ProtectedRoute path="/classes/:classId" exact={true}>
          <ClassDetails />
        </ProtectedRoute>
        <ProtectedRoute path="/classes/:classId/decks/:deckId" exact={true}>
          <DeckDetails />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
