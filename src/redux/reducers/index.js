import { combineReducers } from "redux";
import { ActionTypes } from "../constants/action-types";
import { CartReducer } from "./cartReducer";
import { ChildReducer } from "./childReducer";
import { LoaderReducer } from "./LoaderReducer";
import { LocationReducer } from "./locationReducer";
import { MasterData } from "./MasterData";
import { UserData } from "./UserData";
import { ManageFeesTypes } from "./manageFeesTypeReducer";

const reducers = combineReducers({
    childsData: ChildReducer,
    cartData: CartReducer,
    locationData: LocationReducer,
    loaderData: LoaderReducer,
    masterData: MasterData,
    userData: UserData,
    manageFees: ManageFeesTypes,
});

const rootReducer = (state, action) => {
  if (action.type === ActionTypes.LOGOUT) {
    return reducers(undefined, { type: undefined });
  }
  return reducers(state, action);
};

export default rootReducer;