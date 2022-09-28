import { Link } from "react-router-dom";
import "./ClassCard.css";

function ClassCard({ classData }) {
  return (
    <Link className="class-card-container" to={`/dashboard/${classData.id}`}>
      <div className="class-card-icon-container">
        <img
          className="class-card-icon"
          src="https://www.brainscape.com/assets/app_icons/ugs.png"
        />
      </div>
      <div>
        <h2 className="class-card-name">{classData.name}</h2>
      </div>
    </Link>
  );
}
export default ClassCard;
