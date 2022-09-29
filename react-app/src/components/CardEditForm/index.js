import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createNewCard, updateCardById } from "../../store/card";
import TextareaAutosize from "react-textarea-autosize";
import "./CardEditForm.css";
function CardEditForm({ card, idx }) {
  const [inFocus, setInFocus] = useState(false);
  const [question, setQuestion] = useState(card?.question || "");
  const [answer, setAnswer] = useState(card?.answer || "");
  const { deckId } = useParams();
  const dispatch = useDispatch();

  const handleEdit = async (e) => {
    e.preventDefault();
    setInFocus(false);
    const cardData = {
      id: card.id,
      deck_id: deckId,
      question,
      // mastery eventually
      answer,
    };
    const res = await dispatch(updateCardById(cardData));
  };

  return (
    <div className={`card-edit-container ${inFocus ? "focused" : ""}`}>
      <div className={`card-number ${inFocus ? "focused" : ""}`}>{idx + 1}</div>
      <form onSubmit={handleEdit} className="card-edit-form">
        <div className="card-edit-form-container">
          <div className="card-edit-input-outer border-right">
            <div className="card-edit-input-container">
              <div className="card-edit-label">Q</div>
              <div className="card-edit-textarea-container">
                {/* <textarea
                  type="text"
                  value={question}
                  onBlur={handleEdit}
                  onFocus={() => setInFocus(true)}
                  onKeyUp={(e) => scaleTextArea(e.target)}
                  placeholder=" "
                  className="card-edit-input card-left-input"
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                /> */}
                <TextareaAutosize
                  type="text"
                  value={question}
                  onBlur={handleEdit}
                  onFocus={() => setInFocus(true)}
                  placeholder=" "
                  className="card-edit-input card-left-input"
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="card-edit-input-outer">
            <div className="card-edit-input-container">
              <div className="card-edit-label">A</div>
              <div className="card-edit-textarea-container">
                {/* <textarea
                  type="text"
                  className="card-edit-input"
                  value={answer}
                  onBlur={handleEdit}
                  onFocus={() => setInFocus(true)}
                  placeholder=" "
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                /> */}
                <TextareaAutosize
                  type="text"
                  className="card-edit-input"
                  value={answer}
                  onBlur={handleEdit}
                  onFocus={() => setInFocus(true)}
                  placeholder=" "
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default CardEditForm;
