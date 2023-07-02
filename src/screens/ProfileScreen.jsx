import styled from '@emotion/native';

import {
    ImageBackground,
    Dimensions,
    View,
    StyleSheet,
    Image,
    Pressable,
    Text,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs } from 'firebase/firestore';

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

export const ProfileContainer = styled(View)`
    position: relative;
    height: 500px;
    padding-top: 92px;
    padding-bottom: 46px;
    padding-left: 16px;
    padding-right: 16px;

    background-color: #ffffff;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
`;

export const PhotoBox = styled(View)`
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-44px);
    height: 120px;
    width: 120px;
    background-color: #f6f6f6;
    border-radius: 16px;
`;
export const Photo = styled(Image)`
    width: 100%;
    height: 100%;
    border-radius: 16px;
`;
export const AddAvatarBtn = styled(Pressable)`
    position: absolute;
    right: -12px;
    bottom: 14px;
    width: 25px;
    height: 25px;
`;

export const SignOutBtn = styled(Pressable)`
    position: absolute;
    top: 22px;
    right: 16px;
`;

export const UserName = styled(Text)`
    margin-bottom: 33px;

    text-align: center;
    font-family: 'Roboto-Medium';
    font-size: 30px;
    letter-spacing: 0.3px;
`;

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
            const snapshot = await getDocs(q);
            let newPost = [];
            snapshot.forEach(doc => {
                newPost = [...newPost, { id: doc.id, ...doc.data() }];
            });
            setUserPosts(newPost);
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
                // dispatch(updateUserAvatar(result.assets[0].uri));
            }
            return;
        }
        setImage(null);
    }

    function signOut() {
        dispatch(authSignOutUser());
        navigation.navigate('Login');
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
