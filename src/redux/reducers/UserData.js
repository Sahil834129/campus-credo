import { ActionTypes } from "../constants/action-types"

const initialState = {
    isLoggedInUser: false
}

export const UserData = (state = initialState, { type, payload }) => {
    switch(type) {
        case ActionTypes.GET_IS_USER_LOGGED_IN:
            return {...state};
        case ActionTypes.SET_IS_USER_LOGGED_IN:
            return {...state, isLoggedInUser: payload};
        default:
            return state;
    }
}