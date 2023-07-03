import { 
    createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
    updateProfile,
	signOut,
} from 'firebase/auth';


import { auth } from '../../../config'
import { authChangeAvatar, authSignInState, authSignOutState } from './authSlice';
import { uploadPhotoToServer, showErrorMessage } from '../helpers';

export const authSignUpUser = ({email, password, login, avatar}, navigation) => async (dispatch, getState) => {
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
		navigation.navigate('Home');
	} catch (error) {
		console.log(error.message)
	}
}

export const authSignInUser = ({email, password}, navigation) => async (dispatch, getState) => {
	try {
		await signInWithEmailAndPassword(auth, email, password)

		const {uid, displayName, photoURL, email: userEmail} = await auth.currentUser;

		dispatch(authSignInState({
			userId: uid,
			login: displayName,
			avatar: photoURL,
			email: userEmail
		}))

		navigation.navigate('Home');
	} catch (error) {
		console.log(error.message)
		showErrorMessage(error.message)
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

		const user = auth.currentUser;
		if (user === null) {
			showErrorMessage('Для цієї операції ще раз увійдіть у свій обліковий запис')
		}
		
		await updateProfile(user, {
			photoURL
		})

		dispatch(authChangeAvatar({
			avatar: photoURL,
		}))

	} catch (error) {
		console.log(error)
		console.log(error.message)
	}
}