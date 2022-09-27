import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createNewClass, updateClass } from "../../store/class";

function ClassForm({ edit }) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleCreation = async (e) => {
    e.preventDefault();
    const classData = {
      name,
    };
    const temp = await dispatch(createNewClass(classData));
    console.log(temp);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const classData = {
      id: 1,
      name,
    };
    const temp = await dispatch(updateClass(classData));
    console.log(temp);
  };

  /*
   This will end up being a modal in the future
   Only using this as a test for the backend atm
  */

  return (
    <form onSubmit={edit ? handleEdit : handleCreation}>
      <label>Class Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">{edit ? "Edit Class" : "Create Class"}</button>
    </form>
  );
}

export default ClassForm;
