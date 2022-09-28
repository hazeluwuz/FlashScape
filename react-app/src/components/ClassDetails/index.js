import {
  useParams,
  Redirect,
  NavLink,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getClassById } from "../../store/class";
import DeckList from "../DeckList";
import "./ClassDetails.css";
import ClassModal from "../ClassModal";
function ClassDetails() {
  const { classId } = useParams();
  const { url } = useRouteMatch();
  const classes = useSelector((state) => state.classes);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const curClass = classes[classId];
  useEffect(() => {
    dispatch(getClassById(classId));
  }, [dispatch]);

  if (!curClass) return <Redirect to={`/dashboard`} />;

  return (
    curClass && (
      <div className="class-details-main-container">
        <div className="class-details-info-container">
          <div className="class-icon-container">
            <img
              className="class-details-icon"
              src="https://www.brainscape.com/assets/app_icons/ugs.png"
              alt="class icon"
            ></img>
          </div>
          <div className="class-details-info">
            <div className="class-details-name">
              <div>{curClass.name}</div>
              <ClassModal edit={true} />
            </div>
            <div className="class-details-creator">
              Creator: {user.first_name} {user.last_name}
            </div>
            <div className="class-actions">
              {/* Study Button/Menu would go here (eventually) */}
            </div>
          </div>
          <div className="class-mastery-container">
            {/* NOTE: NOT FUNCTIONAL WILL NEED TO FIX ONCE MASTERY/RATING SCORE IS IMPLEMENTED */}
            <div className="class-mastery-percent">0.0%</div>
            <div className="class-mastery-percent-label">Mastery</div>
          </div>
        </div>
        <div className="class-details-nav">
          <NavLink to={`${url}/about`} className="class-details-about">
            About
          </NavLink>
          <NavLink to={`${url}/decks`} className="class-details-nav-item">
            Decks ({curClass.deck_ids.length})
          </NavLink>
        </div>
        <Switch>
          <Route path="/dashboard/:classId/decks">
            <DeckList deckIds={curClass.deck_ids} />
          </Route>
        </Switch>
      </div>
    )
  );
}
export default ClassDetails;
