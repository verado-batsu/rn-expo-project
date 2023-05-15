import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


import { RegistrationScreen } from './src/screens/RegistrationScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import BackgroundPhoto from './src/assets/images/bg.jpg';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';


const MainStack = createStackNavigator();

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
		<NavigationContainer>
			<ImageBackground resizeMode="cover" source={BackgroundPhoto} style={styles.bgImage}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.container}>
						<MainStack.Navigator initialRouteName="Login">
							<MainStack.Screen name="Registration" component={RegistrationScreen} />
							<MainStack.Screen name="Login" component={LoginScreen} />
							{/* <RegistrationScreen /> */}
							{/* <LoginScreen /> */}
							{/* <StatusBar style="auto" /> */}
						</MainStack.Navigator>
					</View>
				</TouchableWithoutFeedback>
			</ImageBackground>
		</NavigationContainer>
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
