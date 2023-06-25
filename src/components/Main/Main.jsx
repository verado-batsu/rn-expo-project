// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { RegistrationScreen } from '../../screens/RegistrationScreen';
import { LoginScreen } from '../../screens/LoginScreen';
import { Home } from '../../screens/Home';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/selectors';
import { useEffect } from 'react';
import { authStateCnangeUser } from '../../redux/auth/authOperations';

const MainStack = createStackNavigator();

export function Main() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        dispatch(authStateCnangeUser());
    }, []);

    console.log(user);
    return (
        <NavigationContainer>
            <MainStack.Navigator
                // initialRouteName={!stateChange ? 'Login' : 'Home'}
                initialRouteName="Login"
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
