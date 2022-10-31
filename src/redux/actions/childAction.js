import RESTClient from "../../utils/RestClient";
import RestEndPoint from "../constants/RestEndpoints";
import { ActionTypes } from "../constants/action-types";

export const getChildsList = () => {
    return (dispatch) => {
        dispatch({type: ActionTypes.GET_CHILDS_LIST});
        RESTClient.get(RestEndPoint.GET_CHILD_LIST)
        .then((response)=>{
            dispatch({type: ActionTypes.CHILDS_SUCCESS, payload: response.data});
        }).catch((error)=>{
            dispatch({type: ActionTypes.CHILDS_ERROR, payload: error});
        });
    }
}

export const addChild = (reqPayload) => {
    return (dispatch) => {
        RESTClient.post(RestEndPoint.ADD_CHILD, reqPayload)
        .then((response) => {
            RESTClient.get(RestEndPoint.GET_CHILD_LIST).then((response) => {
                dispatch({type: ActionTypes.CHILDS_SUCCESS, payload: response.data});
            });
            console.log(JSON.stringify(response));
        }).catch((error)=>{
            console.log(JSON.stringify(error));
        });
    }
}