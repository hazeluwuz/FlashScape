import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
function ClassDetails() {
  const classes = useSelector((state) => state.classes);
  const { classId } = useParams();
  const [curClass, setCurClass] = useState(null);
  useEffect(() => {
    setCurClass(classes[classId]);
  }, [classes, classId]);

  return (
    curClass && (
      <div className="class-details">
        <h1>{curClass.name}</h1>
      </div>
    )
  );
}
export default ClassDetails;
