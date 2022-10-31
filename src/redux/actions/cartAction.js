import RESTClient from "../../utils/RestClient";
import RestEndPoint from "../constants/RestEndpoints";
import { ActionTypes } from "../constants/action-types";

export const addItemInCart = (reqPayload) => {
    return (dispatch) => {
        RESTClient.post(RestEndPoint.ADD_TO_CART, reqPayload)
        .then((response) => {
            // RESTClient.get(RestEndPoint.GET_CHILD_LIST).then((response) => {
            //     dispatch({type: ActionTypes.CART_LIST_SUCCESS, payload: response.data});
            //});
        }).catch((error)=>{
            console.log(RESTClient.getAPIErrorMessage(error));
        });
    }
}

export const getItemsInCart = () => {
    return (dispatch) => {
        dispatch({type: ActionTypes.GET_CART_ITEMS});
        RESTClient.get(RestEndPoint.GET_CART_ITEMS)
        .then((response)=>{
            dispatch({type: ActionTypes.CART_LIST_SUCCESS, payload: response.data});
        }).catch((error)=>{
            dispatch({type: ActionTypes.CART_LIST_ERROR, payload: error});
        });
    }
}