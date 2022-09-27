import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllClasses, deleteClassById } from "../../store/class";
import ClassForm from "../ClassForm";
function ClassList() {
  const [isLoaded, setIsLoaded] = useState(false);
  const classes = useSelector((state) => Object.values(state.classes));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllClasses()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const handleDelete = async (e, id) => {
    e.preventDefault();
    const res = await dispatch(deleteClassById(id));
    if (res && res.errors) {
      alert(res.errors);
    }
  };
  return (
    isLoaded && (
      <div>
        <div>
          <ClassForm />
        </div>
        <ul>
          {classes.map((c) => (
            <li key={c.id}>
              <div>
                <Link to={`/classes/${c.id}`}>{c.name}</Link>
                <button onClick={(e) => handleDelete(e, c.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default ClassList;
