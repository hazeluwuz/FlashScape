import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteClassById } from "../../store/class";
import "./ClassCard.css";

function ClassCard({ classData }) {
  const dispatch = useDispatch();
  const handleDelete = async (e, id) => {
    e.preventDefault();
    const res = await dispatch(deleteClassById(classData.id));
    if (res && res.errors) {
      alert(res.errors);
    }
  };

  return (
    classData && (
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
        <div className="class-card-delete" onClick={handleDelete}>
          <i class="fa-solid fa-x"></i>
        </div>
      </Link>
    )
  );
}
export default ClassCard;
