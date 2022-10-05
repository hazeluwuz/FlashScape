import { deleteClassById } from "../../store/class";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ClassDelete.css";
function ClassDelete({ closeModal, classData }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await dispatch(deleteClassById(classData.id));
    if (res.ok) {
      history.push("/dashboard");
    }
  };

  return (
    <div className="modal-delete-warning">
      <h3 className="class-warning-text">
        {`You are about to remove this class. Are you sure you wish to proceed?`}
      </h3>
      <div className="modal-warning-actions">
        <button
          className="cancel-button round-button"
          onClick={() => closeModal()}
        >
          Cancel
        </button>
        <div className="class-confirm-delete" onClick={handleDelete}>
          Yes, remove class
        </div>
      </div>
    </div>
  );
}

export default ClassDelete;
