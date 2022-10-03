import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateClassById } from "../../../store/class";
import TextareaAutosize from "react-textarea-autosize";
import "./ClassAboutSectionEdit.css";

function ClassAboutSectionEdit({ classKey, classData, setIsEditing }) {
  const [data, setData] = useState(classData[classKey]);
  const dispatch = useDispatch();
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
  return (
    <form onSubmit={handleSubmit} className="class-about-edit-form">
      <TextareaAutosize
        className="class-about-edit-input"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button
        type="submit"
        className="class-about-edit-button class-edit-about-save"
      >
        <i className="fas fa-save" />
      </button>
    </form>
  );
}

export default ClassAboutSectionEdit;
