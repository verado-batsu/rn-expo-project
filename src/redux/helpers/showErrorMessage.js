import { showMessage } from "react-native-flash-message";

export default function showErrorMessage(message) {
	let errorMessage = ''
		switch (message) { 
			case 'Firebase: Error (auth/invalid-email).':
				errorMessage = 'Invalid email. Please try another.';
				break;
			case 'Firebase: Error (auth/wrong-password).':
				errorMessage = 'Wrong password. Please try again.';
				break;
			default:
				errorMessage = message
				break;
		}
		showMessage({
			message: errorMessage,
			type: "danger",
		});
}