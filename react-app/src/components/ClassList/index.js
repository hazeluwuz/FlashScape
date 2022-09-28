import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserClasses, deleteClassById } from "../../store/class";
import ClassCard from "../ClassCard";
import ClassModal from "../ClassModal";
import "./ClassList.css";
function ClassList() {
  const [isLoaded, setIsLoaded] = useState(false);
  const classes = useSelector((state) => Object.values(state.classes));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUserClasses()).then(() => setIsLoaded(true));
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
        <div className="user-class-container">
          <div>
            <h4 className="user-class-header">My Classes ({classes.length})</h4>
          </div>
          <ClassModal />
        </div>
        {classes.map((c) => (
          <ClassCard classData={c} />
        ))}
      </div>
    )
  );
}

export default ClassList;
