import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDeckById } from "../../store/deck";
import "./DeckEditForm.css";

function DeckEditForm({ deck, setEditing }) {
  const [name, setName] = useState(deck.name);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          <button type="submit" className="deck-edit-save round-button">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
export default DeckEditForm;
