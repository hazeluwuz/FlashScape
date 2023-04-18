import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewClass, updateClassById } from "../../../store/class";
import "./ClassForm.css";
function ClassForm({ closeModal }) {
  const classes = useSelector((state) => state.classes);
  const { classId } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [showErrors, setshowErrors] = useState(false);
  const curClass = classes[classId];
  const dispatch = useDispatch();
  const [name, setName] = useState(curClass?.name || "");

  const handleCreation = async (e) => {
    e.preventDefault();
    setshowErrors(true);
    if (errors.length) return null;
    const classData = {
      name,
    };
    const data = await dispatch(createNewClass(classData));
    if (data && data.errors) {
      setErrors(Object.values(data.errors));
    } else {
      history.push(`/dashboard/${data.id}`);
      closeModal();
    }
  };

  useEffect(() => {
    const errors = [];

    if (name.length < 5) {
      errors.push("name: Name must be at least 5 characters long");
    }
    if (name.length > 50) {
      errors.push("name: Name must be less than 50 characters long");
    }
    setErrors(errors);
  }, [name]);

  return (
    <form onSubmit={handleCreation} className="class-form">
      <div className="input-container">
        <input
          type="text"
          value={name}
          placeholder=" "
          className="text-input"
          onInput={() => setshowErrors(true)}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Class Name</label>
      </div>
      <button
        className="class-submit-button round-button"
        type="submit"
        disabled={errors.length}
      >
        Create Class
      </button>
      <div className="display-errors">
        {errors.length > 0 && showErrors && errors[0].split(": ")[1]}
      </div>
    </form>
  );
}

export default ClassForm;
