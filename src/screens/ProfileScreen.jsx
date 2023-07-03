import {
    ImageBackground,
    Dimensions,
    View,
    StyleSheet,
    Image,
    FlatList,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

import BackgroundPhoto from '../assets/images/bg.jpg';
import AddIcon from '../assets/images/RegistartionScreen/add.png';
import RemoveIcon from '../assets/images/RegistartionScreen/remove.png';
import { Feather } from '@expo/vector-icons';

import { selectUser } from '../redux/selectors';
import {
    authSignOutUser,
    updateUserAvatar,
} from '../redux/auth/authOperations';
import { db } from '../../config';
import {
    AddAvatarBtn,
    EmptyPostText,
    MessageCirle,
    Photo,
    PhotoBox,
    PostCommentsBtn,
    PostCommentsNumber,
    PostContainer,
    PostInfo,
    PostLocationBtn,
    PostLocationLabel,
    PostPhoto,
    PostTitle,
    ProfileContainer,
    SignOutBtn,
    UserName,
} from '../styled-components/ProfileScreen.styled';

export function ProfileScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const userInfo = useSelector(selectUser);

    const [userPosts, setUserPosts] = useState([]);
    const [image, setImage] = useState(userInfo.avatar || null);

    useEffect(() => {
        getUserPosts();
    }, []);

    async function getUserPosts() {
        try {
            const q = query(
                collection(db, 'posts'),
                where('userId', '==', userInfo.userId)
            );
            await onSnapshot(q, snapshot => {
                let newPost = [];
                snapshot.forEach(doc => {
                    newPost = [...newPost, { id: doc.id, ...doc.data() }];
                });
                setUserPosts(newPost);
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function changeAvatar() {
        if (!image) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                setImage(result.assets[0].uri);
                dispatch(updateUserAvatar(result.assets[0].uri));
            }
            return;
        }
        setImage(null);
    }

    function signOut() {
        dispatch(authSignOutUser());
        navigation.navigate('Login');
    }

    function openComments(photo, postId) {
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

    const { pusher, container, bgImage } = styles;
    return (
        <View style={container}>
            <ImageBackground
                resizeMode="cover"
                source={BackgroundPhoto}
                style={bgImage}
            >
                <View style={pusher} />
                <ProfileContainer>
                    <PhotoBox>
                        {image && <Photo source={{ uri: image }} />}
                        <AddAvatarBtn onPress={changeAvatar}>
                            <Image source={!image ? AddIcon : RemoveIcon} />
                        </AddAvatarBtn>
                    </PhotoBox>
                    <SignOutBtn onPress={signOut}>
                        <Feather name="log-out" size={24} color="#BDBDBD" />
                    </SignOutBtn>
                    <UserName>{userInfo.login}</UserName>
                    {userPosts.length === 0 ? (
                        <EmptyPostText>Ви ще не робили пости :(</EmptyPostText>
                    ) : (
                        <FlatList
                            data={userPosts}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                const numberOfCommets = item.numberOfComments
                                    ? item.numberOfComments
                                    : 0;
                                return (
                                    <PostContainer>
                                        <PostPhoto
                                            source={{ uri: item.photo }}
                                        />
                                        <PostTitle>{item.title}</PostTitle>
                                        <PostInfo>
                                            <PostCommentsBtn
                                                onPress={() => {
                                                    openComments(
                                                        item.photo,
                                                        item.id
                                                    );
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
                                                    numberOfCommets={
                                                        numberOfCommets
                                                    }
                                                >
                                                    {numberOfCommets}
                                                </PostCommentsNumber>
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
                    )}
                </ProfileContainer>
            </ImageBackground>
        </View>
    );
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    pusher: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        width: window.width,
        height: window.height,
    },
});
