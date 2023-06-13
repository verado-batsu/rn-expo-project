import styled from '@emotion/native';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Pressable,
    TextInput,
} from 'react-native';
import { Camera } from 'expo-camera';

export const MainContainer = styled(View)`
    flex: 1;
    padding: 24px 16px;

    border-top-width: 0.5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.3);
    background-color: #fff;
`;

export const CameraStyled = styled(Camera)`
    height: 240px;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;

    background-color: #f6f6f6;
    border-radius: 10px;
`;

export const SnapBtn = styled(TouchableOpacity)`
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

export const PhotoView = styled(View)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;
export const Photo = styled(Image)`
    width: 100%;
    height: 100%;
`;

export const LoadPhoto = styled(Pressable)`
    margin-bottom: 32px;
`;
export const LoadPhotoText = styled(Text)`
    font-family: 'Roboto-Regular';
    font-size: 16px;
    line-height: 19px;
    color: #bdbdbd;
`;

export const InputWrapper = styled(View)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 32px;
`;
export const Input = styled(TextInput)`
    height: 50px;
    font-family: 'Roboto-Regular';
    font-size: 16px;
    line-height: 19px;
    color: #212121;

    border-bottom-width: 1px;
    border-style: solid;
    border-color: #e8e8e8;
`;

export const PublishBtn = styled(Pressable)`
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
export const PublishBtnText = styled(Text)`
    font-family: 'Roboto-Regular';
    font-size: 16px;
    line-height: 19px;
    color: ${props => {
        if (props.disabled) {
            return '#bdbdbd';
        }
        return '#ffffff';
    }};
`;

export const RemoveBtn = styled(Pressable)`
    margin: auto;
    padding: 8px 23px;

    background-color: #f6f6f6;
    border-radius: 20px;
`;
