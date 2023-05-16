import styled from '@emotion/native';
import { useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

import { PostsScreen } from './PostsScreen';
import { CreatePostsScreen } from './CreatePostsScreen';
import { ProfileScreen } from './ProfileScreen';

const Tabs = createBottomTabNavigator();

export function Home() {
    const {
        params: { user },
    } = useRoute();

    return (
        <Tabs.Navigator
            initialRouteName="PostsScreen"
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: 'rgba(33, 33, 33, 0.8)',
                tabBarActiveBackgroundColor: '#ff6c00',
                tabBarInactiveBackgroundColor: 'transparent',
                tabBarStyle: {
                    height: 71,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingTop: 9,
                    paddingBottom: 22,
                    paddingLeft: 82,
                    paddingRight: 82,
                },
                tabBarItemStyle: {
                    justifyContent: 'center',
                    borderRadius: 20,
                },
                tabBarIcon: ({ color }) => {
                    switch (route.name) {
                        case 'PostsScreen':
                            return (
                                <AntDesign
                                    name="appstore-o"
                                    size={24}
                                    color={color}
                                />
                            );
                        case 'CreatePostsScreen':
                            return (
                                <AntDesign
                                    name="plus"
                                    size={13}
                                    color={color}
                                />
                            );
                        case 'ProfileScreen':
                            return (
                                <Feather name="user" size={24} color={color} />
                            );
                        default:
                            return;
                    }
                },
            })}
        >
            <Tabs.Screen
                name="PostsScreen"
                component={PostsScreen}
                options={{
                    title: 'Публікації',
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        <Feather name="log-out" size={24} color="black" />
                    ),
                }}
            />
            <Tabs.Screen
                name="CreatePostsScreen"
                component={CreatePostsScreen}
                options={{
                    title: 'Створити публікацію',
                    headerTitleAlign: 'center',
                    headerLeft: () => <Text>{'<-'}</Text>,
                }}
            />
            <Tabs.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
        </Tabs.Navigator>
    );
}
