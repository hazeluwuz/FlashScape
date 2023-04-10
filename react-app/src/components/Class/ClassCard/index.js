import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { deleteClassById } from "../../../store/class";
import ClassDeleteModal from "../ClassDeleteModal";

import "./ClassCard.css";

function ClassCard({ classData }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [isShown, setIsShown] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  if (!classData) return null;

  return (
    classData && (
      <div
        className="class-card-container"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <NavLink className="class-card-link" to={`/dashboard/${classData.id}`}>
          <div className="class-card-icon-container">
            <img
              className="class-card-icon"
              src="https://www.brainscape.com/assets/app_icons/ugs.png"
            />
          </div>
          <div>
            <h2 className="class-card-name">{classData.name}</h2>
          </div>
        </NavLink>
        {isShown && <ClassDeleteModal classData={classData} />}
      </div>
    )
  );
}
export default ClassCard;
