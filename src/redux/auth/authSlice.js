import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userId: null,
	login: null,
	avatar: null,
	email: null,
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
			avatar: payload.avatar,
			email: payload.email,
			isLoggedIn: true
		}),
		authSignOutState: () => ({ ...initialState }),
		authChangeAvatar: (state, { payload }) => ({
			...state,
			avatar: payload.avatar
		})
	}
})

export const authReducer = authSlice.reducer;

export const { authSignInState, authSignOutState, authChangeAvatar } = authSlice.actions;