import {
  useParams,
  useHistory,
  NavLink,
  Link,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deleteDeckById } from "../../store/deck";
import CardList from "../CardList";
import DeckEditForm from "../DeckEditForm";
import "./DeckDetails.css";
import CardBrowse from "../CardBrowse";
function DeckDetails() {
  const sessionUser = useSelector((state) => state.session.user);
  const [editing, setEditing] = useState(false);
  const decks = useSelector((state) => state.decks);
  const classes = useSelector((state) => state.classes);
  const { classId, deckId } = useParams();
  const curClass = classes[classId];
  const deck = decks[deckId];
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await dispatch(deleteDeckById(deckId));
    history.push(`/dashboard/${classId}`);
  };

  if (!deck) return <Redirect to={`/dashboard/${classId}`} />;
  else if (deck && deck.class_id != classId) {
    return <Redirect to={`/dashboard/${classId}`} />;
  }

  if (curClass && curClass.owner_id !== sessionUser.id) {
    return <Redirect to="/dashboard" />;
  }

  if (!curClass) return <Redirect to="/dashboard" />;

  return (
    deck && (
      <div className="deck-details-outer-container">
        <div className="deck-details-header">
          <div className="deck-details-header-inner">
            <Link
              to={`/dashboard/${classId}/decks`}
              className="deck-class-info"
            >
              <div className="deck-back-icon">
                <i class="fa-solid fa-chevron-left"></i>
              </div>
              <img
                className="deck-class-icon"
                src="https://www.brainscape.com/assets/app_icons/ugs.png"
                alt="class icon"
              ></img>
              <div className="deck-class-name">{curClass.name}</div>
            </Link>
            <div className="deck-details-info">
              {editing ? (
                <DeckEditForm deck={deck} setEditing={setEditing} />
              ) : (
                <>
                  <div className="deck-details-name-container">
                    <div className="deck-details-name">{deck.name}</div>
                  </div>
                  <div
                    className="deck-details-edit"
                    onClick={() => setEditing(true)}
                  >
                    <i class="fa-solid fa-pencil deck-details-edit-icon" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="deck-details-nav">
          <NavLink to={`/dashboard/${classId}/decks/${deck.id}/edit`}>
            Edit Cards
          </NavLink>
          <NavLink to={`/dashboard/${classId}/decks/${deck.id}/browse`}>
            Browse Cards
          </NavLink>
        </div>
        <Switch>
          <Route path={`/dashboard/:classId/decks/:deckId/edit`}>
            {/* Card Edit/Create */}
            <CardList card_ids={deck.card_ids} />
          </Route>
          <Route path={`/dashboard/:classId/decks/:deckId/browse`}>
            <CardBrowse deck={deck} />
          </Route>
        </Switch>
      </div>
    )
  );
}
export default DeckDetails;
