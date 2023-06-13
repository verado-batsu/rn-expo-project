import styled from '@emotion/native';
import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Pressable,
    TextInput,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import { useNavigation } from '@react-navigation/native';

import { FontAwesome, Feather } from '@expo/vector-icons';

const MainContainer = styled(View)`
    flex: 1;
    padding: 24px 16px;

    border-top-width: 0.5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.3);
    background-color: #fff;
`;

const CameraStyled = styled(Camera)`
    height: 240px;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;

    background-color: #f6f6f6;
    border-radius: 10px;
`;

const SnapBtn = styled(TouchableOpacity)`
    width: 60px;
    height: 60px;
    justify-content: center;
    align-items: center;

    background-color: ${props => {
        if (props.photo) {
            return 'rgba(255, 255, 255, 0.3)';
        }
        return '#fff';
    }};
    border-radius: 50px;
`;

const PhotoView = styled(View)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;
const Photo = styled(Image)`
    width: 100%;
    height: 100%;
`;

const LoadPhoto = styled(Pressable)`
    margin-bottom: 32px;
`;
const LoadPhotoText = styled(Text)`
    font-family: 'Roboto-Regular';
    font-size: 16px;
    line-height: 19px;
    color: #bdbdbd;
`;

const InputWrapper = styled(View)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 32px;
`;
const Input = styled(TextInput)`
    height: 50px;
    font-family: 'Roboto-Regular';
    font-size: 16px;
    line-height: 19px;
    color: #212121;

    border-bottom-width: 1px;
    border-style: solid;
    border-color: #e8e8e8;
`;

const PublishBtn = styled(Pressable)`
    padding: 16px 32px;
    justify-content: center;
    align-items: center;

    background-color: ${props => {
        if (props.disabled) {
            return '#f6f6f6';
        }
        return '#FF6C00';
    }};
    border-radius: 100px;
`;
const PublishBtnText = styled(Text)`
    font-family: 'Roboto-Regular';
    font-size: 16px;
    line-height: 19px;
    color: ${props => {
        if (props.disabled) {
            return '#bdbdbd';
        }
        return '#fff';
    }};
`;

const RemoveBtn = styled(Pressable)`
    margin: auto;
    padding: 8px 23px;

    background-color: #f6f6f6;
    border-radius: 20px;
`;

export function CreatePostsScreen() {
    const navigation = useNavigation();

    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [photo, setPhoto] = useState(null);
    const [title, setTitle] = useState('');
    const [position, setPosition] = useState('');
    const [isDisableBtn, setIsDisableBtn] = useState(true);

    useEffect(() => {
        if (photo && title && position) {
            setIsDisableBtn(false);
        } else {
            setIsDisableBtn(true);
        }
    }, [photo, title, position]);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();

            setHasPermission(status === 'granted');
        })();
    }, []);

    async function takePhoto() {
        if (!photo) {
            const photo = await cameraRef.takePictureAsync();
            await MediaLibrary.createAssetAsync(photo.uri);
            setPhoto(photo);
            return;
        }
        setPhoto(null);
    }

    function LoadOrChangePhoto() {
        setPhoto(null);
    }

    function publishPost() {
        navigation.navigate('PostsScreen', { photo, title, position });
    }

    function deletePost() {
        setPhoto(null);
        setTitle('');
        setPosition('');
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <MainContainer>
                <CameraStyled ref={setCameraRef}>
                    <SnapBtn onPress={takePhoto} photo={photo}>
                        <FontAwesome name="camera" size={24} color="#BDBDBD" />
                    </SnapBtn>
                    <PhotoView>{photo && <Photo source={photo} />}</PhotoView>
                </CameraStyled>
                <LoadPhoto onPress={LoadOrChangePhoto}>
                    <LoadPhotoText>
                        {!photo ? 'Завантажте фото' : 'Редагувати фото'}
                    </LoadPhotoText>
                </LoadPhoto>
                <InputWrapper>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <Input
                            placeholderTextColor="#BDBDBD"
                            placeholder="Назва..."
                            name="title"
                            onChangeText={setTitle}
                            value={title}
                        />
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <Input
                            placeholderTextColor="#BDBDBD"
                            placeholder="Місцевість..."
                            name="position"
                            onChangeText={setPosition}
                            value={position}
                        />
                    </KeyboardAvoidingView>
                </InputWrapper>
                <View style={{ flex: 1 }}>
                    <PublishBtn onPress={publishPost} disabled={isDisableBtn}>
                        <PublishBtnText disabled={isDisableBtn}>
                            Опублікувати
                        </PublishBtnText>
                    </PublishBtn>
                </View>
                <RemoveBtn onPress={deletePost}>
                    <Feather name="trash-2" size={24} color="#BDBDBD" />
                </RemoveBtn>
            </MainContainer>
        </TouchableWithoutFeedback>
    );
}
