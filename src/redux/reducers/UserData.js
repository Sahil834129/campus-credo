import { getHeaderLink } from "../../utils/helper";
import { ActionTypes } from "../constants/action-types";

const initialState = {
  isLoggedInUser: false,
  havePermission: false,
  schoolFilter: [],
  modulePermissions: getHeaderLink(),
};

export const UserData = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_IS_USER_LOGGED_IN:
      return { ...state };
    case ActionTypes.SET_IS_USER_LOGGED_IN:
      return { ...state, isLoggedInUser: payload };
    case ActionTypes.SET_SCHOOL_FILTER:
      return { ...state, schoolFilter: payload };
    case ActionTypes.UPDATE_HEADER_LINK:
      return { ...state, modulePermissions: getHeaderLink() };
    case ActionTypes.SET_PERMISSION_HAVE:
      return { ...state, havePermission: payload || false };
    default:
      return state;
  }
};
