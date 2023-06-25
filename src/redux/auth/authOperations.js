import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
	signOut
} from 'firebase/auth';

import { auth } from '../../../config'
import { authStateChange, updateUserProfile } from './authSlice';

export const authSignUpUser = ({email, password, login, avatar}) => async (dispatch, getState) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password)

		const user = await auth.currentUser;

		await updateProfile(user, {
			displayName: login
		})

		const {uid, displayName} = await auth.currentUser;

		dispatch(updateUserProfile({
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
		const user = await signInWithEmailAndPassword(auth, email, password)
		dispatch(updateUserProfile({
			userId: user.uid,
			login: user.displayName,
		}))
	} catch (error) {
		console.log(error)
		console.log(error.message)
	}
}

export const authSignOutUser = () => async (dispatch, getState) => {
	try {
		await signOut(auth)
	} catch (error) {
		console.log(error)
		console.log(error.message)
	}
	
}

export const authStateCnangeUser = () => async (dispatch, getState) => {
	await onAuthStateChanged(auth, (user) => {
		if (user) {
			dispatch(updateUserProfile({
			userId: user.uid,
			login: user.displayName,
			}))
			dispatch(authStateChange({stateChange: true}))
		}
		else {
			console.log('User not found')
		}
	})
}