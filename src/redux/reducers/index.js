import {combineReducers} from "redux";
import { ChildReducer } from "./childReducer";
import { CartReducer } from "./cartReducer";
import { LocationReducer } from "./locationReducer";

const reducers = combineReducers({
    childsData: ChildReducer,
    cartData: CartReducer,
    locationData: LocationReducer,
});

export default reducers;