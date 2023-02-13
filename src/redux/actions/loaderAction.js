import { ActionTypes } from "../constants/action-types";

export const getLoading = () => {
    return (dispatch) => {
        dispatch({type: ActionTypes.GET_LOADING});
    }
}

export const setLoading = (loading) => {
    return (dispatch) => {
        dispatch({type: ActionTypes.SET_LOADING, payload: loading});
    }
}