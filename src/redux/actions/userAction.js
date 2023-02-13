import { ActionTypes } from "../constants/action-types";

export const setIsUserLoggedIn = (isUserLoggedIn) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_IS_USER_LOGGED_IN,
      payload: isUserLoggedIn,
    });
  };
};

export const getIsUserLoggedIn = () => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.GET_IS_USER_LOGGED_IN });
  };
};

export const setSchoolFilter = (schoolFilter) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_SCHOOL_FILTER, payload: schoolFilter });
  };
};

export const setUserHavePermission = (payload) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_PERMISSION_HAVE, payload: payload });
  };
};
