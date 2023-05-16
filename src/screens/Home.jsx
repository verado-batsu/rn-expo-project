import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { PostsScreen } from './PostsScreen';

const MainStack = createStackNavigator();

export function Home() {
    return (
        <NavigationContainer>
            <MainStack.Navigator initialRouteName="PostsScreen">
                <MainStack.Screen
                    name="PostsScreen"
                    component={PostsScreen}
                    options={{ headerShown: false }}
                />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}
