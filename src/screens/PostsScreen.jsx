import { createStackNavigator } from '@react-navigation/stack';
import { Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { DefaultPostsScreen } from './nestedScreens/DefaultPostsScreen';
import { MapScreen } from './nestedScreens/MapScreen';
import { CommentsScreen } from './nestedScreens/CommentsScreen';

const NestedStack = createStackNavigator();

export function PostsScreen() {
    const navigation = useNavigation();
    return (
        <NestedStack.Navigator initialRouteName="DefaultScreen">
            <NestedStack.Screen
                name="DefaultPostsScreen"
                component={DefaultPostsScreen}
                options={{
                    title: 'Публікації',
                    headerTitleAlign: 'center',
                    headerLeft: () => {},
                    headerRight: () => (
                        <Pressable onPress={() => navigation.navigate('Login')}>
                            <Feather name="log-out" size={24} color="#BDBDBD" />
                        </Pressable>
                    ),
                    headerRightContainerStyle: {
                        marginRight: 10,
                    },
                }}
            />
            <NestedStack.Screen
                name="CommentsScreen"
                component={CommentsScreen}
                options={{
                    title: 'Коментарі',
                    headerTitleAlign: 'center',
                    headerTintColor: '#212121',
                }}
            />
            <NestedStack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                    title: 'Мапа',
                    headerTitleAlign: 'center',
                    headerTintColor: '#212121',
                }}
            />
        </NestedStack.Navigator>
    );
}
