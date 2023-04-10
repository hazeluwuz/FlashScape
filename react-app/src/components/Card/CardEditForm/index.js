import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateCardById, deleteCardById } from "../../../store/card";
import TextareaAutosize from "react-textarea-autosize";
import "./CardEditForm.css";
import CardDeleteModal from "../CardDeleteModal";
function CardEditForm({ card, idx }) {
  const [inFocus, setInFocus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [question, setQuestion] = useState(card?.question || "");
  const [answer, setAnswer] = useState(card?.answer || "");
  const { deckId } = useParams();
  const dispatch = useDispatch();

  const handleEdit = async (e) => {
    setInFocus(false);
    if (errors.length) return;
    setIsSubmitted(true);
    e.preventDefault();
    const cardData = {
      id: card.id,
      deck_id: deckId,
      question,
      // mastery eventually
      answer,
    };
    const res = await dispatch(updateCardById(cardData));
    if (e.target.classList.contains("fa-save")) {
      document.activeElement.blur();
    }
  };

  const preventEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await dispatch(deleteCardById(card.id));
  };

  useEffect(() => {
    const errors = [];
    if (question.length < 5) {
      errors.push("question: Question must be at least 5 characters long");
    }
    if (question.length > 500) {
      errors.push("question: Question must be less than 500 characters long");
    }
    if (answer.length < 5) {
      errors.push("answer: Answer must be at least 5 characters long");
    }
    if (answer.length > 500) {
      errors.push("answer: Answer must be less than 500 characters long");
    }
    setErrors(errors);
  }, [question, answer]);
  return (
    <div className={`card-edit-container`}>
      <div className={`card-number ${inFocus ? "focused" : ""}`}>{idx + 1}</div>
      <form onSubmit={handleEdit} className="card-edit-form">
        <div
          className={`card-edit-form-container ${inFocus ? "focused" : ""} `}
        >
          <div className="card-edit-input-outer border-right">
            <div className="card-edit-input-container">
              <div className="card-edit-label">Q</div>
              <div className="card-edit-textarea-container">
                <TextareaAutosize
                  type="text"
                  value={question}
                  onBlur={handleEdit}
                  onKeyPress={preventEnter}
                  minLength="5"
                  onFocus={() => setInFocus(true)}
                  placeholder=" "
                  className={`card-edit-input card-left-input`}
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
                  onKeyPress={preventEnter}
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
      <div className="card-edit-actions">
        {(inFocus || showModal) && !errors.length && (
          <>
            <button
              className="card-edit-action-button"
              onMouseDown={handleEdit}
              disabled={errors.length}
              type="submit"
            >
              <i className="fas fa-save"></i>
            </button>
            <CardDeleteModal
              setShowModal={setShowModal}
              showModal={showModal}
              cardData={card}
            />
          </>
        )}
        {errors.length > 0 && (
          <i
            title="Card will not save unless errors are fixed"
            class="fa-solid fa-circle-exclamation card-edit-warning"
          ></i>
        )}
      </div>
      <div className="display-errors card-edit-errors">
        {errors.length > 0 && errors[0].split(": ")[1]}
      </div>
    </div>
  );
}
export default CardEditForm;
