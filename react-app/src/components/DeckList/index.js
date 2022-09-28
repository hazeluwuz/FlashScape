import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeckForm from "../DeckForm";
function DeckList({ deckIds }) {
  const decks = useSelector((state) => state.decks);
  return (
    <div>
      <div>
        <h1>Decks</h1>
        <DeckForm />
      </div>
      {deckIds.map((id) => (
        <div key={id}>
          {/* Need to seperate into diff component (eventually) */}
          {decks[id] && (
            // TODO: fix this lol
            // inefficient but will change later
            <Link to={`/dashboard/${decks[id].class_id}/decks/${id}`}>
              {decks[id].name}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

export default DeckList;
