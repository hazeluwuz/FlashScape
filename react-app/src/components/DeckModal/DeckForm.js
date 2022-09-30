import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createNewDeck, updateDeckById } from "../../store/deck";
import "./DeckForm.css";
function DeckForm({ edit, closeModal }) {
  const [errors, setErrors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  // very temporary will find better way in future lol
  const { classId, deckId } = useParams();
  const handleCreation = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (errors.length) return;
    const deckData = {
      class_id: classId,
      name,
    };
    const temp = await dispatch(createNewDeck(deckData));
    closeModal();
  };

  useEffect(() => {
    const errors = [];
    if (name.length < 5)
      errors.push("name: Name must be at least 5 characters");
    if (name.length > 50)
      errors.push("name: Name must be less than 50 characters");
    setErrors(errors);
  }, [name]);

  return (
    <form className="deck-form" onSubmit={handleCreation}>
      <div className="input-container">
        <input
          type="text"
          className="text-input"
          value={name}
          placeholder=" "
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Deck Name</label>
      </div>
      <button className="round-button deck-submit-button" type="submit">
        Create Deck
      </button>
      <div className="display-errors">
        {errors.length > 0 && isSubmitted && errors[0].split(": ")[1]}
      </div>
    </form>
  );
}

export default DeckForm;
