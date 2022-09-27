import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deleteDeckById } from "../../store/deck";
import DeckForm from "../DeckForm";
import CardForm from "../CardForm";
import CardList from "../CardList";
function DeckDetails() {
  const decks = useSelector((state) => state.decks);
  const { classId, deckId } = useParams();
  const deck = decks[deckId];
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await dispatch(deleteDeckById(deckId));
    history.push(`/classes/${classId}`);
  };

  if (!deck) return null;

  return (
    deck && (
      <div className="deck-details">
        <div style={{ display: "flex" }}>
          <h1>{deck.name}</h1>
          <button onClick={handleDelete}>Delete</button>
        </div>
        <DeckForm edit={true} />
        <CardForm />
        <CardList card_ids={deck.card_ids} />
      </div>
    )
  );
}
export default DeckDetails;
