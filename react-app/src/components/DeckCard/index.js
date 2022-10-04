import { NavLink, useParams, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteDeckById } from "../../store/deck";
import { getClassById } from "../../store/class";
import { useState } from "react";
import "./DeckCard.css";
import { useEffect } from "react";

function DeckCard({ deck }) {
  const colors = {
    0: "#7D93A4",
    1: "#AA0080",
    2: "#FF8A47",
    3: "#FFDD00",
    4: "#7FAE2E",
    5: "#00A8D7",
  };
  const [isShown, setIsShown] = useState(false);
  const [masteryColor, setMasteryColor] = useState(false);
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteDeckById(deck.id, deck.class_id));
  };

  useEffect(() => {
    handleMasteryColor();
  }, []);
  const handleMasteryColor = () => {
    const mastery = Math.round(deck.mastery);
    console.log(mastery);
    if (mastery === 0) setMasteryColor(colors[0]);
    else if (mastery > 0 && mastery < 30) setMasteryColor(colors[1]);
    else if (mastery >= 30 && mastery < 50) setMasteryColor(colors[2]);
    else if (mastery >= 50 && mastery < 80) setMasteryColor(colors[3]);
    else if (mastery >= 80 && mastery < 100) setMasteryColor(colors[4]);
    else if (mastery === 100) setMasteryColor(colors[5]);
  };
  if (!deck) return null;
  return (
    <NavLink
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      to={`${url}/${deck.id}/browse`}
      className="deck-card-container"
    >
      <div className="deck-mastery" style={{ color: masteryColor }}>
        {Math.round(deck.mastery)}%
      </div>
      <div className="deck-card-inner-container">
        <div>
          <h2 className="deck-card-name">{deck.name}</h2>
          <div className="mastery-bar-outer">
            <div
              className="mastery-bar-inner"
              style={{
                width: `${Math.round(deck.mastery)}%`,
                backgroundColor: masteryColor,
              }}
            />
          </div>
        </div>
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
