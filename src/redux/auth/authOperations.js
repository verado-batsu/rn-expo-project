import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
	signOut
} from 'firebase/auth';

import { auth } from '../../../config'
import { authSignInState, authSignOutState } from './authSlice';

export const authSignUpUser = ({email, password, login, avatar}) => async (dispatch, getState) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password)

		const user = await auth.currentUser;

		await updateProfile(user, {
			displayName: login
		})

		const {uid, displayName} = await auth.currentUser;

		dispatch(authSignInState({
			userId: uid,
			login: displayName,
		}))
	} catch (error) {
		console.log(error)
		console.log(error.message)
	}
}

export const authSignInUser = ({email, password}) => async (dispatch, getState) => {
	try {
		await signInWithEmailAndPassword(auth, email, password)

		const {uid, displayName} = await auth.currentUser;

		dispatch(authSignInState({
			userId: uid,
			login: displayName,
		}))
	} catch (error) {
		console.log(error)
		console.log(error.message)
	}
}

export const authSignOutUser = () => async (dispatch, getState) => {
	try {
		await signOut(auth)
		dispatch(authSignOutState())
	} catch (error) {
		console.log(error)
		console.log(error.message)
	}
	
}