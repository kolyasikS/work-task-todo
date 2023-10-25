import {createSlice} from '@reduxjs/toolkit';
import {Task} from '../../entities/Task';
export type Table = {
    page: number,
    limit: number,
    offset: number,
    users: Task[]
}

const initialState: Table = {
    page: 0,
    limit: 10,
    offset: 0,
    users: [],
}
const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setUsers(state, action: {payload: Task[]}) {
            const users = action.payload;

            state.users = users;
        },
        setPage(state, action: {payload: number}) {
            const page = action.payload;

            state.page = page;
            state.offset = page * state.limit;
        }
    }
});

export const {setUsers, setPage} = tableSlice.actions;
export default tableSlice.reducer;