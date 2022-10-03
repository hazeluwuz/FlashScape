import {
  useParams,
  Redirect,
  NavLink,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getClassById } from "../../store/class";
import DeckList from "../DeckList";
import "./ClassDetails.css";
import ClassEditForm from "../ClassEditForm";
import ClassAboutPage from "../ClassAboutPage";
function ClassDetails() {
  const [editing, setEditing] = useState(false);
  const { classId } = useParams();
  const { url } = useRouteMatch();
  const curUrl = useLocation().pathname;
  const classes = useSelector((state) => state.classes);
  const cards = useSelector((state) => state.cards);
  const decks = useSelector((state) => state.decks);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const curClass = classes[classId];
  useEffect(() => {
    dispatch(getClassById(classId));
  }, [dispatch]);

  useEffect(() => {
    setEditing(false);
  }, [curUrl]);

  // const calculateDeckMastery = (deckId) => {
  //   const deck = decks[deckId];
  //   const deckCards = Object.values(cards).filter(
  //     (card) => card.deck_id === deck.id
  //   );
  //   let test = 0;
  //   for (let card of deckCards) {
  //     test += card.mastery;
  //   }
  //   let maxMastery = deckCards.length * 5;
  //   let deckMastery = (test / maxMastery) * 100;
  //   return deckMastery;
  // };

  // const calculateClassMastery = () => {
  //   let res = 0;
  //   for (let id of curClass.deck_ids) {
  //     res += calculateDeckMastery(id);
  //   }
  //   let classMastery = res / curClass.deck_ids.length;
  //   return classMastery.toFixed(1);
  // };

  if (!curClass) return <Redirect to={`/dashboard`} />;
  else if (curClass && curUrl === `/dashboard/${classId}`) {
    history.push(`/dashboard/${classId}/decks`);
  }

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
              {/* Brainscape Edit Style */}
              {editing ? (
                <ClassEditForm classData={curClass} setEditing={setEditing} />
              ) : (
                <div className="class-details-name-inner">
                  <div className="class-name-container">{curClass.name}</div>
                  <button
                    className="class-detail-edit-button"
                    onClick={() => setEditing(true)}
                  >
                    <i class="fa-solid fa-pencil class-edit-icon" />
                  </button>
                </div>
              )}
              {/* Brainscape Edit Style */}

              {/* Modal Edit Style */}
              {/* <div>{curClass.name}</div>
              <ClassModal edit={true} /> */}
              {/* Modal Edit Stlye */}
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
            <div className="class-mastery-percent">
              {curClass.mastery.toFixed(1)}%
            </div>
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
          <Route path={`/dashboard/:classId/about`}>
            <ClassAboutPage classData={curClass} />
          </Route>
          <Route path={`/dashboard/:classId/decks`}>
            <DeckList deckIds={curClass.deck_ids} />
          </Route>
        </Switch>
      </div>
    )
  );
}
export default ClassDetails;
