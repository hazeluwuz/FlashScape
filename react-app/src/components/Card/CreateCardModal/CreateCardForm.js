import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createNewCard } from "../../../store/card";
import "./CreateCardForm.css";
function CreateCardForm({ closeModal }) {
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { deckId } = useParams();
  const dispatch = useDispatch();

  const handleCreate = async (e) => {
    e.preventDefault();
    setShowErrors(true);
    if (errors.length) return;
    const cardData = {
      deck_id: deckId,
      question,
      // mastery eventually
      answer,
    };
    const res = await dispatch(createNewCard(cardData));
    if (res && res.errors) {
      setErrors(res.errors);
    } else {
      closeModal();
    }
  };

  useEffect(() => {
    const errors = [];
    if (question.length < 5)
      errors.push("question: Question must be at least 5 characters long");
    if (question.length > 500)
      errors.push("question: Question must be less than 500 characters");
    if (answer.length < 5)
      errors.push("answer: Answer must be at least 5 characters long");
    if (answer.length > 500)
      errors.push("answer: Answer must be less than 500 characters");
    setErrors(errors);
  }, [question, answer]);

  return (
    <form onSubmit={handleCreate} className="card-form">
      <div className="card-form-container">
        <div className="input-container">
          <input
            type="text"
            value={question}
            placeholder=" "
            onInput={() => setShowErrors(true)}
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
            onInput={() => setShowErrors(true)}
            value={answer}
            placeholder=" "
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
          <label>Answer</label>
        </div>
        <button
          type="submit"
          className="round-button card-submit-button"
          disabled={errors.length}
        >
          Create Card
        </button>
      </div>
      <div className="display-errors ">
        {errors.length > 0 && showErrors && errors[0].split(": ")[1]}
      </div>
    </form>
  );
}
export default CreateCardForm;
