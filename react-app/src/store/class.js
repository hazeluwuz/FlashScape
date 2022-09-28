const GET_CLASSES = "classes/GET_CLASSES";
const CREATE_CLASS = "classes/CREATE_CLASS";
const DELETE_CLASS = "classes/DELETE_CLASS";
const UPDATE_CLASS = "classes/UPDATE_CLASS";
const ADD_DECK_TO_CLASS = "classes/ADD_DECK_TO_CLASS";

const getClasses = (classes) => ({
  type: GET_CLASSES,
  payload: classes,
});

const getUserClasses = (classes) => ({
  type: GET_CLASSES,
  payload: classes,
});

const createClass = (classData) => ({
  type: CREATE_CLASS,
  payload: classData,
});

const deleteClass = (classId) => ({
  type: DELETE_CLASS,
  payload: classId,
});

const updateClass = (classData) => ({
  type: UPDATE_CLASS,
  payload: classData,
});

export const addDeckToClass = (deckId, class_id) => ({
  type: ADD_DECK_TO_CLASS,
  payload: { deckId, class_id },
});

export const getAllClasses = () => async (dispatch) => {
  const response = await fetch("/api/classes/");
  if (response.ok) {
    const classes = await response.json();
    dispatch(getClasses(classes));
  }
};

export const getCurrentUserClasses = (userId) => async (dispatch) => {
  const response = await fetch(`/api/classes/current`);
  if (response.ok) {
    const classes = await response.json();
    dispatch(getUserClasses(classes));
  }
};

export const getClassById = (classId) => async (dispatch) => {
  const response = await fetch(`/api/classes/${classId}`);
  if (response.ok) {
    const classData = await response.json();
    dispatch(updateClass(classData));
  }
};

export const createNewClass = (classData) => async (dispatch) => {
  const response = await fetch("/api/classes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classData),
  });
  if (response.ok) {
    const newClassData = await response.json();
    dispatch(createClass(newClassData));
    return newClassData;
  }
};

export const updateClassById = (classData) => async (dispatch) => {
  const response = await fetch(`/api/classes/${classData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classData),
  });
  if (response.ok) {
    const newClassData = await response.json();
    dispatch(updateClass(newClassData));
    return newClassData;
  }
};

export const deleteClassById = (classId) => async (dispatch) => {
  const response = await fetch(`/api/classes/${classId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteClass(classId));
  } else if (response.status < 500) {
    const data = await response.json();
    return data;
  }
};

export default function reducer(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    case GET_CLASSES:
      return action.payload;
    case CREATE_CLASS:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_CLASS:
      return { ...state, [action.payload.id]: action.payload };
    case ADD_DECK_TO_CLASS:
      newState[action.payload.class_id].deck_ids.push(action.payload.deckId);
      return newState;
    case DELETE_CLASS:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
