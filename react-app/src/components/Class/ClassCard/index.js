import { useState } from "react";
import { NavLink } from "react-router-dom";
import ClassDeleteModal from "../ClassDeleteModal";

import "./ClassCard.css";

function ClassCard({ classData }) {
  const [isShown, setIsShown] = useState(false);

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
              alt="class icon"
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
