import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateClassById } from "../../store/class";
import "./ClassEditForm.css";

function ClassEditForm({ classData, setEditing }) {
  const [name, setName] = useState(classData.name);
  const [errors, setErrors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (errors.length) return;
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

  useEffect(() => {
    const errors = [];
    if (name.length < 5)
      errors.push("name: Name must be at least 5 characters long");
    if (name.length > 50)
      errors.push("name: Name must be less than 50 characters");
    setErrors(errors);
  }, [name]);

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
          <button
            type="submit"
            className="class-edit-save round-button"
            disabled={errors.length}
          >
            Save
          </button>
        </div>
        <div className="display-errors class-edit-errors">
          {errors.length > 0 && errors[0].split(": ")[1]}
        </div>
      </div>
    </form>
  );
}

export default ClassEditForm;
