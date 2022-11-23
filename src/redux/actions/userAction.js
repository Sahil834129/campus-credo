import { ActionTypes } from "../constants/action-types";

export const setIsUserLoggedIn = (isUserLoggedIn) => {
    return (dispatch) => {
        dispatch({type: ActionTypes.SET_IS_USER_LOGGED_IN, payload: isUserLoggedIn});
    }
}

export const getIsUserLoggedIn = () => {
    return (dispatch) => {
        dispatch({type:ActionTypes.GET_IS_USER_LOGGED_IN});
    }
}