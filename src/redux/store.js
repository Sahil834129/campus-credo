import {configureStore} from "@reduxjs/toolkit";
import reducers from "./reducers";
import thunk from "redux-thunk";

//const middlewares = [thunk];
const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    // {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});

export default store;
