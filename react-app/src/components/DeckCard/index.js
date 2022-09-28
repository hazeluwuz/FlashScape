import { NavLink } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import "./DeckCard.css";

function DeckCard({ deck }) {
  const { url } = useRouteMatch();
  if (!deck) return null;
  return (
    <NavLink to={`${url}/${deck.id}/browse`} className="deck-card-container">
      <div>
        <h2 className="deck-card-name">{deck.name}</h2>
      </div>
    </NavLink>
  );
}
export default DeckCard;
