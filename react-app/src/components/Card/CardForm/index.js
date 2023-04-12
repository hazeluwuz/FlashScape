import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createNewCard, updateCardById } from "../../store/card";
import "./CardForm.css";
function CardForm({ edit, card }) {
  const [question, setQuestion] = useState(card?.question || "");
  const [answer, setAnswer] = useState(card?.answer || "");
  const { deckId } = useParams();
  const dispatch = useDispatch();

  const handleCreate = async (e) => {
    e.preventDefault();
    const cardData = {
      deck_id: deckId,
      question,
      // mastery eventually
      answer,
    };
    const res = await dispatch(createNewCard(cardData));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
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
    <form onSubmit={edit ? handleEdit : handleCreate} className="card-form">
      <div className="card-form-container">
        <div className="input-container">
          <input
            type="text"
            value={question}
            placeholder=" "
            className="text-input"
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <label>Question</label>
        </div>
        <div className="input-container">
          <input
            type="text"
            className="text-input"
            value={answer}
            placeholder=" "
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
          <label>Answer</label>
        </div>
        <button type="submit" className="round-button card-submit-button">
          {edit ? "Edit Card" : "Create Card"}
        </button>
      </div>
    </form>
  );
}
export default CardForm;
