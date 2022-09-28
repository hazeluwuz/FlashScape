import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDecks } from "../../store/deck";
import DeckCard from "../DeckCard";
import DeckForm from "../DeckForm";
import "./DeckList.css";
function DeckList({ deckIds }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const decks = useSelector((state) => state.decks);
  useEffect(() => {
    (async () => {
      await dispatch(getAllDecks());
      setIsLoaded(true);
    })();
  }, [dispatch]);
  return (
    isLoaded && (
      <>
        <div className="deck-list-header">
          <h5 className="deck-list-title">Decks</h5>
          <DeckForm />
        </div>
        <div className="deck-list-container">
          {deckIds.map((deckId) => (
            <DeckCard deck={decks[deckId]} />
          ))}
        </div>
      </>
    )
  );
}

export default DeckList;
