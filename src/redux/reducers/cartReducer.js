import { ActionTypes } from "../constants/action-types";

const initialState = {itemsInCart: []};

export const CartReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case ActionTypes.GET_CART_ITEMS:
            return {...state};
        case ActionTypes.CART_LIST_SUCCESS:
            return {...state, itemsInCart:payload};
        case ActionTypes.CART_LIST_ERROR:
            return {...state, itemsInCart:[]};
        default:
            return state;
    }
}
