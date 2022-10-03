import { useState, useEffect } from "react";
import MasteryDisplay from "../MasteryDisplay";
import "./CardDisplay.css";
function CardDisplay({ card, index, deck_length }) {
  const colors = {
    0: "#7D93A4",
    1: "#AA0080",
    2: "#FF8A47",
    3: "#FFDD00",
    4: "#7FAE2E",
    5: "#00A8D7",
  };
  const [color, setColor] = useState("");
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    if (card) {
      setColor(colors[card?.mastery]);
    }
    setFlipped(false);
  }, [card]);

  if (!card) return null;

  return (
    <div className="card-display">
      <div className="card-display-inner">
        <div className="card-display-header" style={{ backgroundColor: color }}>
          <div>
            Card {index + 1} of {deck_length}
          </div>
          <div className="card-display-label">{flipped ? "A" : "Q"}</div>
        </div>
        <div className="card-display-content">
          <div className="card-display-text">
            {flipped ? card.answer : card.question}
          </div>
        </div>
      </div>
      <div className="card-bottom-section">
        {flipped ? (
          <MasteryDisplay card={card} setFlipped={setFlipped} colors={colors} />
        ) : (
          <button
            className="card-display-button round-button"
            style={{ backgroundColor: color }}
            onClick={() => setFlipped((prev) => !prev)}
          >
            Show Answer
          </button>
        )}
      </div>
    </div>
  );
}

export default CardDisplay;
