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
        const cities =await RESTClient.get(RestEndPoint.GET_CITIES); 
        RESTClient.post(RestEndPoint.GET_CITY_NAME, currentLocation)
            .then((response) => {
                if(cities.data.listOfCity.includes(response.data.cityName)){
                dispatch({ type: ActionTypes.SET_GEO_LOCATION, payload: response.data });
                setLocalData("selectedLocation",response.data.cityName);
            } else {
                      dispatch(setSelectedLocation(cities?.data?.listOfCity[0]))
                      setLocalData("selectedLocation", cities?.data?.listOfCity[0]); }
            }).catch((error) => {
                console.log(RESTClient.getAPIErrorMessage(error));
            });
    };

};   