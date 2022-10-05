// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const ADD_CLASS_TO_USER = "session/ADD_CLASS_TO_USER";
const REMOVE_CLASS_FROM_USER = "session/REMOVE_CLASS_FROM_USER";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const addClassToUser = (classId) => ({
  type: ADD_CLASS_TO_USER,
  payload: classId,
});

export const removeClassFromUser = (classId) => ({
  type: REMOVE_CLASS_FROM_USER,
  payload: classId,
});
export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp =
  (firstName, lastName, email, password) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export default function reducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case ADD_CLASS_TO_USER: {
      const newClassIds = [...state.user.class_ids, action.payload];
      newState.user.class_ids = newClassIds;
      return newState;
    }
    case REMOVE_CLASS_FROM_USER: {
      const classIds = [...state.user.class_ids];
      const newClassIds = classIds.filter((id) => id !== action.payload);
      console.log(newClassIds);
      newState.user.class_ids = newClassIds;
      return newState;
    }
    default:
      return state;
  }
}
