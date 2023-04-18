import { ActionTypes } from "../constants/action-types";

export const setSelectedLocation = (location) => { 
    return (dispatch) => {
        dispatch({ type: ActionTypes.SET_LOCATION, payload: location });
    };
};

export const getSelectedLocation = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.GET_LOCATION });
    };
};