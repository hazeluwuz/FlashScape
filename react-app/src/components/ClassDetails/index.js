import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getClassById } from "../../store/class";
import DeckList from "../DeckList";
import "./ClassDetails.css";
import ClassModal from "../ClassModal";
function ClassDetails() {
  const { classId } = useParams();
  const classes = useSelector((state) => state.classes);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const curClass = classes[classId];
  useEffect(() => {
    dispatch(getClassById(classId));
  }, [dispatch]);

  return (
    curClass && (
      <div className="class-details-header">
        <div className="class-details-info-container">
          <div className="class-icon-container">
            <img
              className="class-details-icon"
              src="https://www.brainscape.com/assets/app_icons/ugs.png"
              alt="class icon"
            ></img>
          </div>
          <div className="class-details-info">
            <div className="class-details-name">
              <div className="idfk">{curClass.name}</div>
              <ClassModal edit={true} />
            </div>
            <div className="class-details-creator">
              Creator: {user.first_name} {user.last_name}
            </div>
            <div className="class-actions">
              {/* Study Button/Menu would go here (eventually) */}
            </div>
          </div>
        </div>
        {/* <DeckList deckIds={curClass.deck_ids} /> */}
      </div>
    )
  );
}
export default ClassDetails;
