import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    username: '',
    isAuthenticated: false,
}

export type User = {
    username: string,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: {payload: User}) {
            const user = action.payload;

            state.username = user.username;
            state.isAuthenticated = true;
        },
        clearUser(state) {
            state.username = '';
            state.isAuthenticated = false;
        }
    }
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;