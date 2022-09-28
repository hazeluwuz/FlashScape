import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllClasses, deleteClassById } from "../../store/class";
import "./ClassList.css";
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
      <div className="user-class-list-container">
        <h4 className="user-class-header">My Classes ({classes.length})</h4>

        {classes.map((c) => (
          <div>
            <Link to={`/dashboard/${c.id}`}>{c.name}</Link>
            <button onClick={(e) => handleDelete(e, c.id)}>Delete</button>
          </div>
        ))}
      </div>
    )
  );
}

export default ClassList;
