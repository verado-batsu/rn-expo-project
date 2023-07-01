import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import { collection, addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

import { db } from '../../config';
import { selectUser } from '../redux/selectors';
import { uploadPhotoToServer } from '../redux/helpers/uploadPhotoToServer';

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
    InputPosition,
    MapPin,
    PublishBtn,
    PublishBtnText,
    RemoveBtn,
} from '../styled-components/CreatePostsScreen.styled';

export function CreatePostsScreen() {
    const navigation = useNavigation();

    const { userId, login } = useSelector(selectUser);

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
            await Location.requestForegroundPermissionsAsync();
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

    async function LoadOrChangePhoto() {
        if (!photo) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                setPhoto(result.assets[0]);
            }
            return;
        }
        setPhoto(null);
    }

    async function publishPost() {
        const photoUrl = await uploadPhotoToServer(photo.uri);

        let currLocation = await Location.getCurrentPositionAsync({});

        const post = {
            photo: photoUrl,
            title,
            position,
            location: currLocation.coords,
            userId,
            login,
        };

        await uploadPostToServer(post);

        navigation.navigate('PostsScreen', {
            screen: 'DefaultPostsScreen',
            params: {
                postIsPublish: true,
            },
        });
    }

    async function uploadPostToServer(post) {
        try {
            await addDoc(collection(db, 'posts'), post);
        } catch (error) {
            console.error('Error adding document: ', error);
            throw error;
        }
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
                        <View style={{ position: 'relative' }}>
                            <MapPin name="map-pin" size={24} color="#BDBDBD" />
                            <InputPosition
                                placeholderTextColor="#BDBDBD"
                                placeholder="Місцевість..."
                                name="position"
                                onChangeText={setPosition}
                                value={position}
                            />
                        </View>
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
