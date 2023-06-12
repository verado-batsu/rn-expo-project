import styled from '@emotion/native';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import { FontAwesome } from '@expo/vector-icons';

const MainContainer = styled(View)`
    flex: 1;
    padding: 32px 16px;

    border-top-width: 0.5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.3);
    background-color: #fff;
`;

const CameraStyled = styled(Camera)`
    height: 240px;
    justify-content: center;
    align-items: center;

    background-color: #f6f6f6;
`;

const SnapBtn = styled(TouchableOpacity)`
    width: 60px;
    height: 60px;
    justify-content: center;
    align-items: center;

    background-color: #ffffff;
    border-radius: 50px;
`;

const PhotoView = styled(View)`
    position: absolute;
    top: 0;
    left: 0;
    border-color: #fff;
    border-width: 1px;
    border-style: solid;
`;

export function CreatePostsScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();

            setHasPermission(status === 'granted');
        })();
    }, []);

    async function takePhoto() {
        const photo = await cameraRef.takePictureAsync();
        await MediaLibrary.createAssetAsync(photo.uri);
        setPhoto(photo);
    }

    return (
        <MainContainer>
            <CameraStyled ref={setCameraRef}>
                <PhotoView>
                    <Image source={photo} style={{ width: 100, height: 100 }} />
                </PhotoView>
                <SnapBtn onPress={takePhoto}>
                    <FontAwesome name="camera" size={24} color="#BDBDBD" />
                </SnapBtn>
            </CameraStyled>
        </MainContainer>
    );
}
