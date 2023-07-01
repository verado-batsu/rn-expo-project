import styled from '@emotion/native';

import {
    ImageBackground,
    Dimensions,
    View,
    StyleSheet,
    Image,
    Pressable,
} from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';

import BackgroundPhoto from '../assets/images/bg.jpg';
import AddIcon from '../assets/images/RegistartionScreen/add.png';
import RemoveIcon from '../assets/images/RegistartionScreen/remove.png';

import { selectUser } from '../redux/selectors';
import { updateUserAvatar } from '../redux/auth/authOperations';

export const ProfileContainer = styled(View)`
    position: relative;
    height: 500px;
    background-color: #ffffff;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
`;

export const PhotoBox = styled(View)`
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-60px);
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

export function ProfileScreen() {
    const dispatch = useDispatch();

    const userInfo = useSelector(selectUser);

    const [image, setImage] = useState(userInfo.avatar || null);

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
