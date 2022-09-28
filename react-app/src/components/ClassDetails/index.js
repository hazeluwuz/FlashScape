import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getClassById } from "../../store/class";
import DeckList from "../DeckList";
function ClassDetails() {
  const { classId } = useParams();
  const classes = useSelector((state) => state.classes);
  const dispatch = useDispatch();
  const curClass = classes[classId];
  useEffect(() => {
    dispatch(getClassById(classId));
  }, [dispatch]);

  return (
    curClass && (
      <div className="class-details">
        <h1>{curClass.name}</h1>
        <DeckList deckIds={curClass.deck_ids} />
      </div>
    )
  );
}
export default ClassDetails;
