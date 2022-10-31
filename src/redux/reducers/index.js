import {combineReducers} from "redux";
import { ChildReducer } from "./childReducer";
import { CartReducer } from "./cartReducer";
import { LocationReducer } from "./locationReducer";
import { LoaderReducer } from "./LoaderReducer";

const reducers = combineReducers({
    childsData: ChildReducer,
    cartData: CartReducer,
    locationData: LocationReducer,
    loaderData: LoaderReducer,
});

export default reducers;