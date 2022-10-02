import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateDeckById } from "../../store/deck";
import "./DeckEditForm.css";

function DeckEditForm({ deck, setEditing }) {
  const [errors, setErrors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState(deck.name);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (errors.length) return;
    const payload = {
      id: deck.id,
      class_id: deck.class_id,
      name,
    };
    await dispatch(updateDeckById(payload));
    setEditing(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditing(false);
  };

  useEffect(() => {
    const errors = [];
    if (name.length < 5)
      errors.push("name: Name must be at least 5 characters long");
    if (name.length > 50)
      errors.push("name: Name must be less than 50 characters");
    setErrors(errors);
  }, [name]);

  return (
    <form onSubmit={handleSubmit} className="deck-edit-form">
      <div className="deck-edit-form-container">
        <input
          type="text"
          className="deck-edit-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="deck-edit-actions">
          <button
            type="button"
            className="deck-edit-cancel"
            onClick={handleCancel}
          >
            <i class="fa-solid fa-x deck-edit-cancel-icon"></i>
          </button>
          <button
            type="submit"
            className="deck-edit-save round-button"
            disabled={errors.length}
          >
            Save
          </button>
        </div>
      </div>
      <div className="display-errors deck-edit-errors">
        {errors.length > 0 && errors[0].split(": ")[1]}
      </div>
    </form>
  );
}
export default DeckEditForm;
