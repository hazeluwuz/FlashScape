import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createNewClass } from "../../store/class";

function ClassForm() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const classData = {
      name,
    };
    const temp = await dispatch(createNewClass(classData));
    console.log(temp);
  };

  /*
   This will end up being a modal in the future
   Only using this as a test for the backend atm
  */

  return (
    <form onSubmit={handleSubmit}>
      <label>Class Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Create Class</button>
    </form>
  );
}

export default ClassForm;
