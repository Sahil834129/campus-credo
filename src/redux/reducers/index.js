import {combineReducers} from "redux";
import { ChildReducer } from "./childReducer";
import { CartReducer } from "./cartReducer";
import { LocationReducer } from "./locationReducer";
import { LoaderReducer } from "./LoaderReducer";
import { MasterData } from "./MasterData";
import { UserData } from "./UserData";

const reducers = combineReducers({
    childsData: ChildReducer,
    cartData: CartReducer,
    locationData: LocationReducer,
    loaderData: LoaderReducer,
    masterData: MasterData,
    userData: UserData,
});

export default reducers;