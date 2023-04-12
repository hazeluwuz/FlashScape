import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCards } from "../../../store/card";
import CardEditForm from "../CardEditForm";
import CreateCardModal from "../CreateCardModal";
import "./CardList.css";
function CardList({ card_ids }) {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards);
  useEffect(() => {
    dispatch(getAllCards(card_ids));
  }, [dispatch, card_ids]);
  return (
    <div className="card-list">
      {card_ids.map((card_id, idx) => (
        <CardEditForm key={card_id} card={cards[card_id]} idx={idx} />
      ))}
      <div className="new-card-container">
        <div className="card-number"></div>
        <CreateCardModal />
      </div>
    </div>
  );
}

export default CardList;
