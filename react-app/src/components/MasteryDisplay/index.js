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
        <div>
          <button
            onClick={(e) => handleMasteryChange(e, 1)}
            className="mastery-select-button"
            style={{ backgroundColor: colors[1] }}
          >
            1
          </button>
          <div className="mastery-container-labels">Not at all</div>
        </div>
        <button
          onClick={(e) => handleMasteryChange(e, 2)}
          className="mastery-select-button"
          style={{ backgroundColor: colors[2] }}
        >
          2
        </button>
        <button
          onClick={(e) => handleMasteryChange(e, 3)}
          className="mastery-select-button"
          style={{ backgroundColor: colors[3] }}
        >
          3
        </button>
        <button
          onClick={(e) => handleMasteryChange(e, 4)}
          className="mastery-select-button"
          style={{ backgroundColor: colors[4] }}
        >
          4
        </button>
        <div>
          <button
            onClick={(e) => handleMasteryChange(e, 5)}
            className="mastery-select-button"
            style={{ backgroundColor: colors[5] }}
          >
            5
          </button>
          <div className="mastery-container-labels">Perfectly</div>
        </div>
      </div>
    </div>
  );
}
export default MasteryDisplay;
