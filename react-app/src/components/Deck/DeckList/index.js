import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDecks } from "../../../store/deck";
import DeckCard from "../DeckCard";
import DeckForm from "../DeckModal";
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

  const clickCreateDeckButton = (e) => {
    e.preventDefault();
    let btn = document.getElementById("create-deck-button");
    btn.click();
  };

  return (
    isLoaded && (
      <>
        <div className="deck-list-header">
          <h5 className="deck-list-title">Decks</h5>
          <DeckForm />
        </div>
        <div className="deck-list-container">
          {!deckIds.length && (
            <div className="deck-list-empty-container">
              <h2 className="deck-list-empty-header">
                Add decks to your class
              </h2>
              <p className="deck-list-empty-message">
                <strong>Your class has no decks.</strong> A Deck is a collection
                of Flashcards in a Class, similar to chapters in a book. Add a
                Deck to get started.
              </p>
              <button
                className="round-button deck-list-create-deck-button"
                onClick={clickCreateDeckButton}
              >
                Create New Deck
              </button>
            </div>
          )}
          {deckIds.map((deckId) => (
            <DeckCard key={deckId} deck={decks[deckId]} />
          ))}
        </div>
      </>
    )
  );
}

export default DeckList;
