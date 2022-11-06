import { deleteCardById } from "../../store/card";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./CardDelete.css";
function CardDelete({ closeModal, cardData }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await dispatch(deleteCardById(cardData.id));
  };

  return (
    <div className="modal-delete-warning">
      <h3 className="class-warning-text">
        {`You are about to remove this card. Are you sure you wish to proceed?`}
      </h3>
      <div className="modal-warning-actions">
        <button
          className="cancel-button round-button"
          onClick={() => closeModal()}
        >
          Cancel
        </button>
        <div className="class-confirm-delete" onMouseDown={handleDelete}>
          Yes, remove card
        </div>
      </div>
    </div>
  );
}

export default CardDelete;
