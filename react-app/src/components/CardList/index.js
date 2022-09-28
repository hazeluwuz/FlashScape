import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCards } from "../../store/card";
import CardDisplay from "../CardDisplay";
function CardList({ card_ids }) {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards);
  useEffect(() => {
    dispatch(getAllCards(card_ids));
  }, [dispatch]);
  return (
    <div>
      {card_ids.map((card_id) => (
        <CardDisplay card={cards[card_id]} />
      ))}
    </div>
  );
}

export default CardList;
