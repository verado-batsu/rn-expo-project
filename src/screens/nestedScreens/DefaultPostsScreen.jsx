import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import {
    collection,
    onSnapshot,
    // addDoc,
    // deleteDoc,
    // doc,
    // getDocs,
    // updateDoc,
} from 'firebase/firestore';

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
    PostLocationBtn,
    PostLocationLabel,
    PostCommentsNumber,
    // LikeBtn,
    // LikeIcon,
    // PostLikeNumber,
} from '../../styled-components/nestedScreenStyle/PostsScreen.styled';

import { selectUser } from '../../redux/selectors';

export function DefaultPostsScreen() {
    const navigation = useNavigation();

    const userInfo = useSelector(selectUser);

    const [posts, setPosts] = useState([]);
    // const [likes, setLikes] = useState([]);

    useEffect(() => {
        getAllPosts();
    }, []);

    async function getAllPosts() {
        try {
            await onSnapshot(collection(db, 'posts'), snapshot => {
                let newPost = [];
                snapshot.forEach(doc => {
                    newPost = [...newPost, { id: doc.id, ...doc.data() }];
                });
                setPosts(newPost);
            });
        } catch (error) {
            console.log(error);
        }
    }

    function openComments({ photo, postId }) {
        navigation.navigate('CommentsScreen', {
            postsPhoto: photo,
            postId,
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

    // async function handleLike({ postId, userId }) {
    //     try {
    //         await getAllLikes(postId);
    //         let deleteLikeId = null;

    //         console.log('likes', likes);

    //         likes.forEach(like => {
    //             if (like.userId === userId) {
    //                 deleteLikeId = like.id;
    //             }
    //         });

    //         if (!deleteLikeId) {
    //             await addDoc(collection(db, 'posts', postId, 'likes'), {
    //                 userId,
    //             });
    //         } else {
    //             await deleteDoc(
    //                 doc(db, 'posts', postId, 'likes', deleteLikeId)
    //             );
    //         }
    //         // await getAllLikes(postId);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // async function getAllLikes(postId) {
    //     try {
    //         const snapshot = await getDocs(
    //             collection(db, 'posts', postId, 'likes')
    //         );
    //         let likes = [];
    //         snapshot.forEach(doc => {
    //             likes = [...likes, { id: doc.id, ...doc.data() }];
    //         });
    //         setLikes(likes);
    //         updateDoc(doc(db, 'posts', postId), {
    //             numberOfLike: likes.length,
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

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
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    const numberOfCommets = item.numberOfComments
                        ? item.numberOfComments
                        : 0;
                    // const numberOfLike = item.numberOfLike ? numberOfLike : 0;
                    return (
                        <PostContainer>
                            <PostPhoto source={{ uri: item.photo }} />
                            <PostTitle>{item.title}</PostTitle>
                            <PostInfo>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        gap: 24,
                                    }}
                                >
                                    <PostCommentsBtn
                                        onPress={() => {
                                            openComments({
                                                photo: item.photo,
                                                postId: item.id,
                                            });
                                        }}
                                    >
                                        <MessageCirle
                                            name="message-circle"
                                            size={24}
                                            color={
                                                numberOfCommets === 0
                                                    ? '#BDBDBD'
                                                    : '#FF6C00'
                                            }
                                        />
                                        <PostCommentsNumber
                                            numberOfCommets={numberOfCommets}
                                        >
                                            {numberOfCommets}
                                        </PostCommentsNumber>
                                    </PostCommentsBtn>
                                    {/* <LikeBtn
                                        onPress={() => {
                                            handleLike({
                                                postId: item.id,
                                                userId: userInfo.userId,
                                            });
                                        }}
                                    >
                                        <LikeIcon
                                            name="thumbs-up"
                                            size={24}
                                            color="#BDBDBD"
                                        />
                                        <PostLikeNumber>
                                            {numberOfLike}
                                        </PostLikeNumber>
                                    </LikeBtn> */}
                                </View>
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
