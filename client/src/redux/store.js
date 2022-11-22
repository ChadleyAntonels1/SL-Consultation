import { combineReducers } from "redux";
import { userSlice } from "./userSlice";
import { lecturerSlice } from "./lecturerSlice";

import {configureStore} from "@reduxjs/toolkit"


const rootReducer = combineReducers({
    user: userSlice.reducer,
    lecturer: lecturerSlice.reducer

});

const store = configureStore({
    reducer: rootReducer, 
    
});

export default store;