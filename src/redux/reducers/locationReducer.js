import { ActionTypes } from "../constants/action-types";

const initialState = {
    selectedLocation: "Kolkata"
};

export const LocationReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case ActionTypes.GET_CHILDS_LIST:
            return {...state};
        case ActionTypes.SET_LOCATION:
            return {...state, selectedLocation: payload};
        default:
            return state;
    }
}