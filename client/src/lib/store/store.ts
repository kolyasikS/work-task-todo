import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/user.slice';
import tableReducer from './slices/table.slice';

const reducer = combineReducers({
    user: userReducer,
    table: tableReducer,
})

const store = configureStore({
    reducer,
})

export default store;