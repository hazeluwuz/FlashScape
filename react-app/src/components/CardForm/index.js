import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createNewCard } from "../../store/card";
function CardForm() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { deckId } = useParams();
  const dispatch = useDispatch();

  const handleCreate = async (e) => {
    e.preventDefault();
    const cardData = {
      deck_id: deckId,
      question,
      answer,
    };
    const res = await dispatch(createNewCard(cardData));
    console.log(res);
  };
  return (
    <form onSubmit={handleCreate}>
      <label>Question:</label>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <label>Answer:</label>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <button type="submit">Create Card</button>
    </form>
  );
}
export default CardForm;
