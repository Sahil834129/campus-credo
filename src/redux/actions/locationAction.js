import { getCurretLocation } from "../../utils/helper";
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

export const setGeoLocation = () => {
    return async (dispatch) => {
        const currentLocation = await getCurretLocation();
        dispatch({ type: ActionTypes.SET_GEO_LOCATION, payload: currentLocation });
    };

};   