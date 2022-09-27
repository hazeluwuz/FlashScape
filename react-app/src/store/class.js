const GET_CLASSES = "classes/GET_CLASSES";
const CREATE_CLASS = "classes/CREATE_CLASS";
const DELETE_CLASS = "classes/DELETE_CLASS";
const UPDATE_CLASS = "classes/UPDATE_CLASS";

const getClasses = (classes) => ({
  type: GET_CLASSES,
  payload: classes,
});

export const getAllClasses = () => async (dispatch) => {
  const response = await fetch("/api/classes/");
  if (response.ok) {
    const classes = await response.json();
    dispatch(getClasses(classes));
  }
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_CLASSES:
      return action.payload;
    default:
      return state;
  }
}
