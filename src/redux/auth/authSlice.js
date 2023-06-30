import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userId: null,
	login: null,
	isLoggedIn: false
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authSignInState: (state, { payload }) => ({
			...state,
			userId: payload.userId,
			login: payload.login,
			isLoggedIn: true
		}),
		authSignOutState: () => ({...initialState}),
	}
})

export const authReducer = authSlice.reducer;

export const { authSignInState, authSignOutState } = authSlice.actions;