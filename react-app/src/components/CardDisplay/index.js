import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./CardDisplay.css";
function CardDisplay({ card, index, deck_length }) {
  const [flipped, setFlipped] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setFlipped(false);
  }, [card]);
  if (!card) return null;

  return (
    <div className="card-display">
      <div className="card-display-inner">
        <div className="card-display-header">
          <div>
            Card {index + 1} of {deck_length}
          </div>
        </div>
        <div className="card-display-content">
          <div className="card-display-text">
            {flipped ? card.answer : card.question}
          </div>
        </div>
      </div>
      <button
        className="card-display-button round-button"
        onClick={() => setFlipped((prev) => !prev)}
      >
        {flipped ? "Show Question" : "Show Answer"}
      </button>
    </div>
  );
}

export default CardDisplay;
