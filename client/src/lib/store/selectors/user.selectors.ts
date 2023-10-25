interface RootState {
    user: {
        username: string,
        isAuthenticated: boolean;
    }
}
export const selectUsername = (state: RootState) => {
    return state.user.username;
}