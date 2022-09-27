import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClasses, deleteClassById } from "../../store/class";
function ClassList() {
  const [isLoaded, setIsLoaded] = useState(false);
  const classes = useSelector((state) => Object.values(state.classes));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllClasses()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const handleDelete = async (e, id) => {
    e.preventDefault();
    const test = await dispatch(deleteClassById(id));
    console.log(test);
  };
  return (
    isLoaded && (
      <ul>
        {classes.map((c) => (
          <li key={c.id}>
            <div>
              {c.name}
              <button onClick={(e) => handleDelete(e, c.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    )
  );
}

export default ClassList;
