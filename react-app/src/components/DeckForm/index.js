import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createNewDeck, updateDeckById } from "../../store/deck";
function DeckForm({ edit }) {
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
    console.log("deckData", deckData);
    const temp = await dispatch(createNewDeck(deckData));
    console.log(temp);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const deckData = {
      id: deckId,
      class_id: classId,
      name,
    };
    const temp = await dispatch(updateDeckById(deckData));
    console.log(temp);
  };

  /*
   This will end up being a modal in the future
   Only using this as a test for the backend atm
  */

  return (
    <form onSubmit={edit ? handleEdit : handleCreation}>
      <label>Deck Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">{edit ? "Edit Deck" : "Create Deck"}</button>
    </form>
  );
}

export default DeckForm;
