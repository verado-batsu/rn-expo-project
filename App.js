// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground } from 'react-native';


import { RegistrationScreen } from './src/screens/RegistrationScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import BackgroundPhoto from './src/images/RegistartionScreen/bg.jpg';




export default function App() {
	return (
		<View style={styles.container}>
			<ImageBackground resizeMode="cover" source={BackgroundPhoto} style={styles.image}>
				{/* <RegistrationScreen /> */}
				<LoginScreen />
				{/* <StatusBar style="auto" /> */}
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

	},
	image: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
