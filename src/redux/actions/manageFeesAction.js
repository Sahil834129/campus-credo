import { getSchoolFeeType } from "../../utils/services";
import { ActionTypes } from "../constants/action-types";

export const getManageFeesType = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.GET_FEES_TYPE });
        getSchoolFeeType()
            .then(response => {
                let temp = []
                temp = response.data
                temp = temp.map((val) => {
                    return {
                        ...val,
                        editable: false,
                        add: false,
                    }
                })
                dispatch({ type: ActionTypes.SET_FEES_TYPE, payload: temp });
            })
            .catch(error => {
                dispatch({ type: ActionTypes.FEES_TYPE_ERROR, payload: error?.response?.data?.apierror?.message || "Something Went Wrong" });
            });
    };
};
