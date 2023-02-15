import { ActionTypes } from "../constants/action-types";

const initialState = {
  selectedLocation: "Kolkata",
  geolocation: {
    longitude: 0,
    latitude: 0
  }
};

export const LocationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_LOCATION:
      return { ...state };
    case ActionTypes.SET_LOCATION:
      return { ...state, selectedLocation: payload };
    case ActionTypes.SET_GEO_LOCATION:
      return {
        ...state,
        selectedLocation: payload.cityName,
        geolocation: {
          longitude: payload.longitude,
          latitude: payload.latitude,
          cityName : payload.cityName
        }
      };
    default:
      return state;
  }
};