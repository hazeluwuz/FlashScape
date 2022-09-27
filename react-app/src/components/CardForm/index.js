import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createNewCard, updateCardById } from "../../store/card";
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
    console.log(res);
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
    console.log(res);
  };
  return (
    <form onSubmit={edit ? handleEdit : handleCreate}>
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
      <button type="submit">{edit ? "Edit Card" : "Create Card"}</button>
    </form>
  );
}
export default CardForm;
