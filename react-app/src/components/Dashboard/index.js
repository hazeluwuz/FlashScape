import { Switch } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import Sidebar from "../Sidebar";
import ClassDetails from "../ClassDetails";
import DeckDetails from "../DeckDetails";
import "./Dashboard.css";

function Dashboard() {
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
