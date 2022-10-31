import { ActionTypes } from "../constants/action-types";

const initialState = {
    childs: []
};
export const ChildReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case ActionTypes.GET_CHILDS_LIST:
            return {...state};
        case ActionTypes.CHILDS_SUCCESS:
            return {...state, childs:payload};
        case ActionTypes.CHILDS_ERROR:
            return {...state, childs:[]};
        default:
            return state;
    }

}