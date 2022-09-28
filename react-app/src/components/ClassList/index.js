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
    (async () => {
      await dispatch(getCurrentUserClasses());
      setIsLoaded(true);
    })();
  }, [dispatch]);

  return (
    isLoaded && (
      <div className="user-class-list-container">
        <div className="user-class-container">
          <div className="user-class-inner">
            <h4 className="user-class-header">My Classes ({classes.length})</h4>
            <ClassModal />
          </div>
        </div>
        {classes.map((c) => (
          <ClassCard classData={c} />
        ))}
      </div>
    )
  );
}

export default ClassList;
