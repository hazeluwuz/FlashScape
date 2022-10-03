import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateClassById } from "../../../store/class";
import TextareaAutosize from "react-textarea-autosize";
import "./ClassAboutSectionEdit.css";

function ClassAboutSectionEdit({ classKey, classData, setIsEditing }) {
  const [data, setData] = useState(classData[classKey] || "");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const title = classKey[0].toUpperCase() + classKey.slice(1);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: classData.id,
      name: classData.name,
      [classKey]: data,
    };
    const res = await dispatch(updateClassById(payload));

    if (res) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    const errors = [];
    if (data && data.length > 255) {
      errors.push(`${classKey}: ${title} must be less than 255 characters`);
    }
    setErrors(errors);
  }, [data]);
  return (
    <form onSubmit={handleSubmit} className="class-about-edit-form">
      <TextareaAutosize
        className="class-about-edit-input"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      {!errors.length && (
        <button
          disabled={errors.length}
          type="submit"
          className="class-about-edit-button class-edit-about-save"
        >
          <i className="fas fa-save class-about-edit-save-icon" />
        </button>
      )}
      {errors.length > 0 && (
        <i
          title={`${title} will not save unless errors are fixed`}
          class="fa-solid fa-circle-exclamation class-edit-warning"
        ></i>
      )}
      <div className="display-errors class-edit-errors">
        {errors.length > 0 && errors[0].split(": ")[1]}
      </div>
    </form>
  );
}

export default ClassAboutSectionEdit;
