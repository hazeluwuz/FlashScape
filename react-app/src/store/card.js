import { addCardToDeck } from "./deck";
const GET_CARDS = "cards/GET_CARDS";
const CREATE_CARD = "cards/CREATE_CARD";
const UPDATE_CARD = "cards/UPDATE_CARD";
const DELETE_CARD = "cards/DELETE_CARD";

const getCards = (cards) => ({
  type: GET_CARDS,
  payload: cards,
});

const createCard = (card) => ({
  type: CREATE_CARD,
  payload: card,
});

const updateCard = (card) => ({
  type: UPDATE_CARD,
  payload: card,
});

const deleteCard = (cardId) => ({
  type: DELETE_CARD,
  payload: cardId,
});

export const getAllCards = () => async (dispatch) => {
  const response = await fetch("/api/cards/");
  if (response.ok) {
    const cards = await response.json();
    dispatch(getCards(cards));
  }
};

export const getCardById = (cardId) => async (dispatch) => {
  const response = await fetch(`/api/cards/${cardId}`);
  if (response.ok) {
    const card = await response.json();
    dispatch(updateCard(card));
  }
};

export const createNewCard = (card) => async (dispatch) => {
  const response = await fetch("/api/cards/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });
  if (response.ok) {
    const newCard = await response.json();
    dispatch(createCard(newCard));
    dispatch(addCardToDeck(newCard.id, newCard.deck_id));
    return newCard;
  }
};

export const updateCardById = (card) => async (dispatch) => {
  const response = await fetch(`/api/cards/${card.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });
  if (response.ok) {
    const updatedCard = await response.json();
    dispatch(updateCard(updatedCard));
    return updatedCard;
  }
};

export const deleteCardById = (cardId) => async (dispatch) => {
  const response = await fetch(`/api/cards/${cardId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteCard(cardId));
  }
};

export default function reducer(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    case GET_CARDS:
      return action.payload;
    case CREATE_CARD:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_CARD:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_CARD:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
