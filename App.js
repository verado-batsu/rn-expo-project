// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';


import { RegistrationScreen } from './src/screens/RegistrationScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import BackgroundPhoto from './src/assets/images/bg.jpg';
import { useFonts } from 'expo-font';




export default function App() {
	const [fontsLoaded] = useFonts({
        'Roboto-Bold': require('./src/assets/fonts/roboto/Roboto-Bold.ttf'),
        'Roboto-Regular': require('./src/assets/fonts/roboto/Roboto-Regular.ttf'),
        'Roboto-Medium': require('./src/assets/fonts/roboto/Roboto-Medium.ttf'),
	});

	if (!fontsLoaded) {
        return null;
	}
	
	
	return (
		<ImageBackground resizeMode="cover" source={BackgroundPhoto} style={styles.bgImage}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					<RegistrationScreen />
					{/* <LoginScreen /> */}
					{/* <StatusBar style="auto" /> */}
				</View>
			</TouchableWithoutFeedback>
		</ImageBackground>
	);
}

const window = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		flex: 1,

	},
	bgImage: {
		flex: 1,
		width: window.width,
		height: window.height
	},
});
