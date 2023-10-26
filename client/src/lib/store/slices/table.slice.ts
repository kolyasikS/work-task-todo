import {createSlice} from '@reduxjs/toolkit';
import {Task} from '../../entities/Task';
export type Table = {
    page: number,
    limit: number,
    offset: number,
    tasks: Task[]
}

const initialState: Table = {
    page: 0,
    limit: 10,
    offset: 0,
    tasks: [],
}
const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setTasks(state, action: {payload: Task[]}) {
            const tasks = action.payload;

            state.tasks = tasks;
        },
        setPage(state, action: {payload: number}) {
            const page = action.payload;

            state.page = page;
            state.offset = page * state.limit;
        }
    }
});

export const {setTasks, setPage} = tableSlice.actions;
export default tableSlice.reducer;