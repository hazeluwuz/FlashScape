import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createNewCard, updateCardById } from "../../store/card";
import "./CreateCardForm.css";
function CreateCardForm({ closeModal }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
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
    closeModal();
  };

  return (
    <form onSubmit={handleCreate} className="card-form">
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
          Create Card
        </button>
      </div>
    </form>
  );
}
export default CreateCardForm;
