import {combineReducers, configureStore} from "@reduxjs/toolkit";
import tableReducer from './slices/table.slice';

const reducer = combineReducers({
    table: tableReducer,
})

const store = configureStore({
    reducer,
})

export default store;