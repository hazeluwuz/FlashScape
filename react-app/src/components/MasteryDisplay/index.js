import { useDispatch } from "react-redux";
import { updateCardById } from "../../store/card";
import "./MasteryDisplay.css";

function MasteryDisplay({ card, setFlipped, colors }) {
  const dispatch = useDispatch();

  const handleMasteryChange = (e, mastery) => {
    e.preventDefault();
    const payload = {
      id: card.id,
      deck_id: card.deck_id,
      question: card.question,
      answer: card.answer,
      mastery,
    };

    dispatch(updateCardById(payload));
    setFlipped((prev) => !prev);
  };

  return (
    <div className="mastery-container">
      <div className="mastery-container-header">
        How well did you know this?
      </div>
      <div className="mastery-select-container">
        {[1, 2, 3, 4, 5].map((num) => (
          <div>
            <button
              onClick={(e) => handleMasteryChange(e, num)}
              className="mastery-select-button"
              style={{ backgroundColor: colors[num] }}
            >
              {num}
            </button>
            <div className="mastery-container-labels">
              {num === 1 ? "Not at all" : num === 5 ? "Perfectly" : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MasteryDisplay;
