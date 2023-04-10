import { Switch, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "../auth/ProtectedRoute";
import Sidebar from "../Sidebar";
import ClassDetails from "../Class/ClassDetails";
import DeckDetails from "../Deck/DeckDetails";
import "./Dashboard.css";

function Dashboard() {
  const classesSlice = useSelector((state) => state.classes);
  const user = useSelector((state) => state.session.user);
  const classes = user.class_ids.map((id) => classesSlice[id]);
  const history = useHistory();
  const curUrl = useLocation().pathname;

  // if (classes.length > 0 && curUrl === "/dashboard") {
  //   if (classes[0]) history.push(`/dashboard/${classes[0].id}/decks`);
  // }

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
