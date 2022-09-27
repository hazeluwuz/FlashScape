import { useSelector } from "react-redux";
import CardDisplay from "../CardDisplay";
function CardList({ card_ids }) {
  const cards = useSelector((state) => state.cards);
  return (
    <div>
      {card_ids.map((card_id) => (
        <CardDisplay card={cards[card_id]} />
      ))}
    </div>
  );
}

export default CardList;
