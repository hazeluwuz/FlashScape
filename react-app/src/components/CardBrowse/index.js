import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CardDisplay from "../CardDisplay";
import "./CardBrowse.css";

function CardBrowse({ deck }) {
  const [card, setCard] = useState(null);
  const [index, setIndex] = useState(0);
  const cards = useSelector((state) => state.cards);

  useEffect(() => {
    if (deck) {
      setCard(deck.card_ids[index]);
    }
  }, [deck, index]);

  if (deck.card_ids.length === 0) {
    return <h1 className="card-display-none">No cards added yet</h1>;
  }

  return (
    <div className="card-display-container">
      <div className="card-display-container-inner">
        <div className="prev-card-container">
          {index > 0 && (
            <button
              className="prev-card-button"
              onClick={() => setIndex((prev) => prev - 1)}
            >
              <i class="fa-solid fa-chevron-left"></i>
            </button>
          )}
        </div>
        <CardDisplay
          card={cards[card]}
          index={index}
          deck_length={deck.card_ids.length}
        />
        <div className="next-card-container">
          {index < deck.card_ids.length - 1 && (
            <button
              className="next-card-button"
              onClick={() => setIndex((prev) => prev + 1)}
            >
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardBrowse;
