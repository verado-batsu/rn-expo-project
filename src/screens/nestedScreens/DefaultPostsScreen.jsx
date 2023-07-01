import { View, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../../../config';

import {
    MainContainer,
    UserContainer,
    AvatarContainer,
    Avatar,
    UserName,
    UserEmail,
    PostContainer,
    PostPhoto,
    PostTitle,
    PostInfo,
    PostCommentsBtn,
    MessageCirle,
    PostCommentsLabel,
    PostLocationBtn,
    PostLocationLabel,
} from '../../styled-components/nestedScreenStyle/PostsScreen.styled';

import { selectUser } from '../../redux/selectors';

export function DefaultPostsScreen() {
    const navigation = useNavigation();

    const userInfo = useSelector(selectUser);

    const params = useRoute()?.params;

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts();
    }, [params]);

    async function getAllPosts() {
        try {
            const snapshot = await getDocs(collection(db, 'posts'));
            let newPost = [];
            snapshot.forEach(doc => {
                newPost = [...newPost, { id: doc.id, ...doc.data() }];
            });
            setPosts(newPost);
        } catch (error) {
            console.log(error);
        }
    }

    function openComments(photo) {
        navigation.navigate('CommentsScreen', {
            postsPhoto: photo,
        });
    }

    function openMap(location) {
        navigation.navigate('MapScreen', {
            location: {
                latitude: location.latitude,
                longitude: location.longitude,
            },
        });
    }

    return (
        <MainContainer>
            <UserContainer>
                <AvatarContainer>
                    {userInfo && userInfo.avatar && (
                        <Avatar source={{ uri: userInfo.avatar }} />
                    )}
                </AvatarContainer>
                <View>
                    <UserName>
                        {userInfo && userInfo.login ? userInfo.login : 'Anonim'}
                    </UserName>
                    <UserEmail>
                        {userInfo && userInfo.email
                            ? userInfo.email
                            : 'Anonim.@gmail.com'}
                    </UserEmail>
                </View>
            </UserContainer>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <PostContainer>
                            <PostPhoto source={{ uri: item.photo }} />
                            <PostTitle>{item.title}</PostTitle>
                            <PostInfo>
                                <PostCommentsBtn
                                    onPress={() => {
                                        openComments(item.photo);
                                    }}
                                >
                                    <MessageCirle
                                        name="message-circle"
                                        size={24}
                                        color="#BDBDBD"
                                    />
                                    <PostCommentsLabel>0</PostCommentsLabel>
                                </PostCommentsBtn>
                                <PostLocationBtn
                                    onPress={() => {
                                        openMap(item.location);
                                    }}
                                >
                                    <Feather
                                        name="map-pin"
                                        size={24}
                                        color="#BDBDBD"
                                    />
                                    <PostLocationLabel>
                                        {item.position}
                                    </PostLocationLabel>
                                </PostLocationBtn>
                            </PostInfo>
                        </PostContainer>
                    );
                }}
            />
        </MainContainer>
    );
}
