import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewClass, updateClassById } from "../../store/class";
import "./ClassForm.css";
function ClassForm({ edit, closeModal }) {
  const classes = useSelector((state) => state.classes);
  const { classId } = useParams();
  const curClass = classes[classId];
  const dispatch = useDispatch();
  const [name, setName] = useState(curClass.name || "");

  const handleCreation = async (e) => {
    e.preventDefault();
    const classData = {
      name,
    };
    const temp = await dispatch(createNewClass(classData));
    closeModal();
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const classData = {
      id: classId,
      name,
    };
    const temp = await dispatch(updateClassById(classData));
    closeModal();
  };

  /*
   This will end up being a modal in the future
   Only using this as a test for the backend atm
  */

  return (
    <form onSubmit={edit ? handleEdit : handleCreation} className="class-form">
      <div className="input-container">
        <input
          type="text"
          value={name}
          placeholder=" "
          className="text-input"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Class Name</label>
      </div>
      <button className="class-submit-button round-button" type="submit">
        {edit ? "Edit Class" : "Create Class"}
      </button>
    </form>
  );
}

export default ClassForm;
