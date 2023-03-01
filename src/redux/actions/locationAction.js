import { getCurretLocation, setLocalData } from "../../utils/helper";
import RESTClient from "../../utils/RestClient";
import { ActionTypes } from "../constants/action-types";
import RestEndPoint from "../constants/RestEndpoints";

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
        RESTClient.post(RestEndPoint.GET_CITY_NAME, currentLocation)
            .then((response) => {
                setLocalData("selectedLocation", response.data.cityName);
                dispatch({ type: ActionTypes.SET_GEO_LOCATION, payload: response.data });
            }).catch((error) => {
                console.log(RESTClient.getAPIErrorMessage(error));
            });
    };

};   