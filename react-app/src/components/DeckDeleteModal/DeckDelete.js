import { deleteDeckById } from "../../store/deck";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./DeckDelete.css";
function DeckDelete({ closeModal, deckData }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await dispatch(deleteDeckById(deckData.id, deckData.class_id));
    if (res.ok) {
      history.push("/dashboard");
    }
  };

  return (
    <div className="modal-delete-warning">
      <h3 className="class-warning-text">
        {`You are about to remove this deck. Are you sure you wish to proceed?`}
      </h3>
      <div className="modal-warning-actions">
        <button
          className="cancel-button round-button"
          onClick={() => closeModal()}
        >
          Cancel
        </button>
        <div className="class-confirm-delete" onClick={handleDelete}>
          Yes, remove deck
        </div>
      </div>
    </div>
  );
}

export default DeckDelete;
