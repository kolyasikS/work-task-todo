import {Table} from "../slices/table.slice";
import {createSelector} from "reselect";

interface RootState {
    table: Table
}
export const selectCountPages = (countUsers: number) => (state: RootState) => {
    return Math.ceil(countUsers / state.table.limit);
}

export const selectPage = (state: RootState) => {
    return state.table.page;
}

export const selectTasks = (state: RootState) => {
    return state.table.tasks;
}

const selectTable = (state: RootState) => {
    return state.table;
}
export const selectRestrictions = createSelector([selectTable], (table) => {
    return {
            offset: table.offset,
            limit: table.limit
    };
});