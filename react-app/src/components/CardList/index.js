import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCards } from "../../store/card";
import CardDisplay from "../CardDisplay";
import CardEditForm from "../CardEditForm";
import "./CardList.css";
function CardList({ card_ids, preview }) {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards);
  useEffect(() => {
    dispatch(getAllCards(card_ids));
  }, [dispatch]);
  return (
    <div className="card-list">
      {preview &&
        card_ids.map((card_id) => <CardDisplay card={cards[card_id]} />)}
      {!preview &&
        card_ids.map((card_id, idx) => (
          <CardEditForm card={cards[card_id]} idx={idx} />
        ))}
    </div>
  );
}

export default CardList;
