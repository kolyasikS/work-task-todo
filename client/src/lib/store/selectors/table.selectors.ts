import {Table} from "../slices/table.slice";
import {state} from "sucrase/dist/types/parser/traverser/base";
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

export const selectUsers = (state: RootState) => {
    return state.table.users;
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