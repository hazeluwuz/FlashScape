import { addDeckToClass } from "./class";
const GET_DECKS = "decks/GET_DECKS";
const CREATE_DECK = "decks/CREATE_DECK";
const DELETE_DECK = "decks/DELETE_DECK";
const UPDATE_DECK = "decks/UPDATE_DECK";
const ADD_CARD_TO_DECK = "decks/ADD_CARD_TO_DECK";
const REMOVE_CARD_FROM_DECK = "decks/REMOVE_CARD_FROM_DECK";

const getDecks = (decks) => ({
  type: GET_DECKS,
  payload: decks,
});

const createDeck = (deck) => ({
  type: CREATE_DECK,
  payload: deck,
});

const updateDeck = (deck) => ({
  type: UPDATE_DECK,
  payload: deck,
});

const deleteDeck = (deckId) => ({
  type: DELETE_DECK,
  payload: deckId,
});

export const addCardToDeck = (cardId, deckId) => ({
  type: ADD_CARD_TO_DECK,
  payload: { cardId, deckId },
});

export const removeCardFromDeck = (cardId, deckId) => ({
  type: REMOVE_CARD_FROM_DECK,
  payload: { cardId, deckId },
});

export const getAllDecks = () => async (dispatch) => {
  const response = await fetch("/api/decks/");
  if (response.ok) {
    const decks = await response.json();
    dispatch(getDecks(decks));
  }
};

export const createNewDeck = (deck) => async (dispatch) => {
  const response = await fetch("/api/decks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deck),
  });
  if (response.ok) {
    const newDeck = await response.json();
    dispatch(createDeck(newDeck));
    dispatch(addDeckToClass(newDeck.id, newDeck.class_id));
    return newDeck;
  }
};

export const updateDeckById = (deck) => async (dispatch) => {
  const response = await fetch(`/api/decks/${deck.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deck),
  });
  if (response.ok) {
    const newDeck = await response.json();
    dispatch(updateDeck(newDeck));
    return newDeck;
  }
};

export const deleteDeckById = (deckId) => async (dispatch) => {
  const response = await fetch(`/api/decks/${deckId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteDeck(deckId));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  }
};

export default function reducer(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    case GET_DECKS:
      return action.payload;
    case CREATE_DECK:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_DECK:
      return { ...state, [action.payload.id]: action.payload };
    case ADD_CARD_TO_DECK:
      newState[action.payload.deckId].card_ids.push(action.payload.cardId);
      return newState;
    case REMOVE_CARD_FROM_DECK:
      const { cardId, deckId } = action.payload;
      const cardIds = newState[deckId].card_ids;
      cardIds.splice(cardIds.indexOf(cardId), 1);
      return newState;
    case DELETE_DECK:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
