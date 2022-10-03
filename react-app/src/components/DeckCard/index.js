import { NavLink, useParams, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteDeckById } from "../../store/deck";
import { getClassById } from "../../store/class";
import { useState } from "react";
import "./DeckCard.css";

function DeckCard({ deck }) {
  const [isShown, setIsShown] = useState(false);
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  if (!deck) return null;

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteDeckById(deck.id, deck.class_id));
  };

  return (
    <NavLink
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      to={`${url}/${deck.id}/browse`}
      className="deck-card-container"
    >
      <div className="deck-card-inner-container">
        <h2 className="deck-card-name">{deck.name}</h2>
        {isShown && (
          <button onClick={handleDelete} className="deck-delete-button">
            <i class="fa-solid fa-trash deck-delete-icon"></i>
          </button>
        )}
      </div>
    </NavLink>
  );
}
export default DeckCard;
