import { useDispatch } from "react-redux";
import { deleteCardById } from "../../store/card";
import CardEditForm from "../CardEditForm";
import CardForm from "../CardForm";
import "./CardDisplay.css";
function CardDisplay({ card }) {
  const dispatch = useDispatch();
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteCardById(card.id));
  };

  if (!card) return null;

  return (
    <div className="card-display">
      <div>
        <h1>{card.question}</h1>
      </div>
      <div>
        <h1>{card.answer}</h1>
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default CardDisplay;
