// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { RegistrationScreen } from '../../screens/RegistrationScreen';
import { LoginScreen } from '../../screens/LoginScreen';
import { Home } from '../../screens/Home';
import { selectUser } from '../../redux/selectors';

const MainStack = createStackNavigator();

export function Main() {
    const { isLoggedIn } = useSelector(selectUser);

    return (
        <NavigationContainer>
            <MainStack.Navigator
                initialRouteName={!isLoggedIn ? 'Login' : 'Home'}
            >
                <MainStack.Screen
                    name="Registration"
                    component={RegistrationScreen}
                    options={{ headerShown: false }}
                />
                <MainStack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <MainStack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                {/* <StatusBar style="auto" /> */}
            </MainStack.Navigator>
        </NavigationContainer>
    );
}
