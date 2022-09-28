import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateClassById } from "../../store/class";
import "./ClassEditForm.css";

function ClassEditForm({ classData, setEditing }) {
  const [name, setName] = useState(classData.name);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: classData.id,
      name,
    };

    await dispatch(updateClassById(payload));
    setEditing(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="class-edit-form">
      <div className="class-edit-form-container">
        <input
          type="text"
          className="class-edit-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="class-edit-actions">
          <button
            type="button"
            className="class-edit-cancel"
            onClick={handleCancel}
          >
            <i class="fa-solid fa-x class-edit-cancel-icon"></i>
          </button>
          <button type="submit" className="class-edit-save round-button">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default ClassEditForm;
