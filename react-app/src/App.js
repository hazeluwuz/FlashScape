import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import SplashPage from "./components/SplashPage";
import Dashboard from "./components/Dashboard";
import { getAllCards } from "./store/card";
import { getAllClasses } from "./store/class";
import { getAllDecks } from "./store/deck";
function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();


  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
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
      <Switch>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        {/* BACKEND TESTING ROUTES */}
        <ProtectedRoute path="/dashboard">
          <Dashboard />
        </ProtectedRoute>
        <Route path="/" exact>
          <SplashPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
