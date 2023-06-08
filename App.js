import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
// import { StatusBar } from 'expo-status-bar';

import { RegistrationScreen } from './src/screens/RegistrationScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { Home } from './src/screens/Home';

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
				<MainStack.Navigator initialRouteName="Login">
					<MainStack.Screen
						name="Registration"
						component={RegistrationScreen}
						options={{headerShown: false}}
					/>
					<MainStack.Screen
						name="Login"
						component={LoginScreen}
						options={{headerShown: false}}
					/>
					<MainStack.Screen
						name="Home"
						component={Home}
						options={{headerShown: false}}
					/>
					{/* <StatusBar style="auto" /> */}
				</MainStack.Navigator>
			</NavigationContainer>
	);
}
