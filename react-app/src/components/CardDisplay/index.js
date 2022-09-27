import "./CardDisplay.css";
function CardDisplay({ card }) {
  if (!card) return null;
  return (
    <div className="card-display">
      <div>
        <h1>{card.question}</h1>
      </div>
      <div>
        <h1>{card.answer}</h1>
      </div>
    </div>
  );
}

export default CardDisplay;
