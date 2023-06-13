import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import { useNavigation } from '@react-navigation/native';

import { FontAwesome, Feather } from '@expo/vector-icons';

import {
    MainContainer,
    CameraStyled,
    SnapBtn,
    PhotoView,
    Photo,
    LoadPhoto,
    LoadPhotoText,
    InputWrapper,
    Input,
    PublishBtn,
    PublishBtnText,
    RemoveBtn,
} from '../styled-components/CreatePostsScreen.styled';

export function CreatePostsScreen() {
    const navigation = useNavigation();

    const [cameraRef, setCameraRef] = useState(null);
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
            await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
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
        navigation.navigate('PostsScreen', {
            post: { photo, title, position },
        });
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
