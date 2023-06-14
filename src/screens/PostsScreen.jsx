import { createStackNavigator } from '@react-navigation/stack';
import { DefaultPostsScreen } from './nestedScreens/DefaultPostsScreen';
import { MapScreen } from './nestedScreens/MapScreen';
import { CommentsScreen } from './nestedScreens/CommentsScreen';

const NestedStack = createStackNavigator();

export function PostsScreen() {
    return (
        <NestedStack.Navigator initialRouteName="DefaultScreen">
            <NestedStack.Screen
                name="DefaultScreen"
                component={DefaultPostsScreen}
            />
            <NestedStack.Screen name="MapScreen" component={MapScreen} />
            <NestedStack.Screen
                name="CommentsScreen"
                component={CommentsScreen}
            />
        </NestedStack.Navigator>
    );
}
