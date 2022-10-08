import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserClasses, deleteClassById } from "../../store/class";
import ClassCard from "../ClassCard";
import ClassModal from "../ClassModal";
import "./ClassList.css";
function ClassList() {
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const classesSlice = useSelector((state) => state.classes);
  const classes = sessionUser.class_ids.map((id) => classesSlice[id]);
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
          <ClassCard key={c?.id} classData={c} />
        ))}
      </div>
    )
  );
}

export default ClassList;
