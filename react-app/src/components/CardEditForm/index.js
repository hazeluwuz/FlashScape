import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateCardById, deleteCardById } from "../../store/card";
import TextareaAutosize from "react-textarea-autosize";
import "./CardEditForm.css";
function CardEditForm({ card, idx }) {
  const [inFocus, setInFocus] = useState(false);
  const [question, setQuestion] = useState(card?.question || "");
  const [answer, setAnswer] = useState(card?.answer || "");
  const { deckId } = useParams();
  const dispatch = useDispatch();

  const handleEdit = async (e) => {
    setInFocus(false);
    e.preventDefault();
    const cardData = {
      id: card.id,
      deck_id: deckId,
      question,
      // mastery eventually
      answer,
    };
    const res = await dispatch(updateCardById(cardData));
    document.activeElement.blur();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await dispatch(deleteCardById(card.id));
    document.activeElement.blur();
  };

  const clearFocus = (e) => {
    setQuestion(card?.question || "");
    setAnswer(card?.answer || "");
    setInFocus(false);
  };

  return (
    <div className={`card-edit-container`}>
      <div className={`card-number ${inFocus ? "focused" : ""}`}>{idx + 1}</div>
      <form onSubmit={handleEdit} className="card-edit-form">
        <div
          className={`card-edit-form-container  ${inFocus ? "focused" : ""}`}
        >
          <div className="card-edit-input-outer border-right">
            <div className="card-edit-input-container">
              <div className="card-edit-label">Q</div>
              <div className="card-edit-textarea-container">
                <TextareaAutosize
                  type="text"
                  value={question}
                  onBlur={clearFocus}
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
                <TextareaAutosize
                  type="text"
                  className="card-edit-input"
                  value={answer}
                  onBlur={clearFocus}
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
      <div className="card-edit-actions">
        {inFocus && (
          <>
            <button
              className="card-edit-action-button"
              onMouseDown={handleEdit}
              type="submit"
            >
              <i className="fas fa-save"></i>
            </button>
            <button
              className="card-edit-action-button"
              onMouseDown={handleDelete}
              type="button"
            >
              <i className="fas fa-trash"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export default CardEditForm;
