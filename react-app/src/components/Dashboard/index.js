import { Switch, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "../auth/ProtectedRoute";
import Sidebar from "../Sidebar";
import ClassDetails from "../ClassDetails";
import DeckDetails from "../DeckDetails";
import "./Dashboard.css";

function Dashboard() {
  const classes = useSelector((state) => Object.values(state.classes));
  const history = useHistory();
  const curUrl = useLocation().pathname;

  if (classes.length > 0 && curUrl === "/dashboard") {
    history.push(`/dashboard/${classes[0].id}/decks`);
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Switch>
          <ProtectedRoute path="/dashboard/:classId/decks/:deckId">
            <DeckDetails />
          </ProtectedRoute>
          <ProtectedRoute path="/dashboard/:classId">
            <ClassDetails />
          </ProtectedRoute>
        </Switch>
      </div>
    </div>
  );
}

export default Dashboard;
