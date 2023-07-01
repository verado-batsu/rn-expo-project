import { 
    createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
    updateProfile,
	signOut,
} from 'firebase/auth';

import { auth } from '../../../config'
import { authSignInState, authSignOutState } from './authSlice';
import { uploadPhotoToServer } from '../helpers/uploadPhotoToServer';

export const authSignUpUser = ({email, password, login, avatar}) => async (dispatch, getState) => {
	try {
		const photoUrl = await uploadPhotoToServer(avatar)
		await createUserWithEmailAndPassword(auth, email, password)

		const user = await auth.currentUser;

		await updateProfile(user, {
			displayName: login,
			photoURL: photoUrl
		})

		const {uid, displayName, photoURL, email: userEmail} = await auth.currentUser;

		dispatch(authSignInState({
			userId: uid,
			login: displayName,
			avatar: photoURL,
			email: userEmail
		}))
	} catch (error) {
		console.log(error)
		console.log(error.message)
	}
}

export const authSignInUser = ({email, password}) => async (dispatch, getState) => {
	try {
		await signInWithEmailAndPassword(auth, email, password)

		const {uid, displayName, photoURL, email: userEmail} = await auth.currentUser;

		dispatch(authSignInState({
			userId: uid,
			login: displayName,
			avatar: photoURL,
			email: userEmail
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

export const updateUserAvatar = (newAvatar) => async (dispatch, getState) => {
	try {
		const photoURL = await uploadPhotoToServer(newAvatar)

		const user = getState().auth;
		console.log(user)
		
		await updateProfile({userId: user.userId}, {
			photoURL
		})

	} catch (error) {
		console.log(error)
		console.log(error.message)
	}
}