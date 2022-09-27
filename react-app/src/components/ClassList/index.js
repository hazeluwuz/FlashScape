import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClasses } from "../../store/class";
function ClassList() {
  const [isLoaded, setIsLoaded] = useState(false);
  const classes = useSelector((state) => Object.values(state.classes));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllClasses()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    isLoaded && (
      <ul>
        {classes.map((c) => (
          <li key={c.id}>
            <div>{c.name}</div>
          </li>
        ))}
      </ul>
    )
  );
}

export default ClassList;
