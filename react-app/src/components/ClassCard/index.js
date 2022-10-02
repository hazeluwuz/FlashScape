import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { deleteClassById } from "../../store/class";
import "./ClassCard.css";

function ClassCard({ classData }) {
  const [isShown, setIsShown] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleDelete = async (e, id) => {
    e.preventDefault();
    const res = await dispatch(deleteClassById(classData.id));
    if (res.ok) {
      history.push("/dashboard");
    }
  };

  return (
    classData && (
      <NavLink
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        className="class-card-container"
        to={`/dashboard/${classData.id}/decks`}
      >
        <div className="class-card-icon-container">
          <img
            className="class-card-icon"
            src="https://www.brainscape.com/assets/app_icons/ugs.png"
          />
        </div>
        <div>
          <h2 className="class-card-name">{classData.name}</h2>
        </div>
        {isShown && (
          <div className="class-card-delete" onClick={handleDelete}>
            <i class="fa-solid fa-x"></i>
          </div>
        )}
      </NavLink>
    )
  );
}
export default ClassCard;
