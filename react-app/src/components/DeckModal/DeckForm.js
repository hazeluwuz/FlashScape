import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createNewDeck, updateDeckById } from "../../store/deck";
import "./DeckForm.css";
function DeckForm({ edit, closeModal }) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  // very temporary will find better way in future lol
  const { classId, deckId } = useParams();
  const handleCreation = async (e) => {
    e.preventDefault();
    const deckData = {
      class_id: classId,
      name,
    };
    const temp = await dispatch(createNewDeck(deckData));
    closeModal();
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const deckData = {
      id: deckId,
      class_id: classId,
      name,
    };
    const temp = await dispatch(updateDeckById(deckData));
    closeModal();
  };

  /*
   This will end up being a modal in the future
   Only using this as a test for the backend atm
  */

  return (
    <form className="deck-form" onSubmit={edit ? handleEdit : handleCreation}>
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
        {edit ? "Edit Deck" : "Create Deck"}
      </button>
    </form>
  );
}

export default DeckForm;
