import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateClassById } from "../../../store/class";
import TextareaAutosize from "react-textarea-autosize";

function ClassAboutSectionEdit({ classKey, classData, setIsEditing }) {
  const [data, setData] = useState(classData[classKey]);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: classData.id,
      [classKey]: data,
    };
    console.log(payload, classKey);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextareaAutosize
        className="class-about-edit-input"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button type="submit" className="class-about-edit-button">
        <i className="fas fa-save" />
      </button>
    </form>
  );
}

export default ClassAboutSectionEdit;
