import { ActionTypes } from "../constants/action-types";
const initialState = { loading : false};

export const LoaderReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case ActionTypes.GET_LOADING:
            return {...state};
        case ActionTypes.SET_LOADING:
            return {...state, loading: payload};
        default:
            return state;
    }
}