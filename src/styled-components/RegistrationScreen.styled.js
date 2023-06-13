import styled from '@emotion/native';
import {
    Image,
    Pressable,
    Text,
    View
} from 'react-native';

export const Container = styled(View)`
    position: relative;
    width: 100%;
    height: 549px;
    padding-top: 92px;
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

export const FormWrapper = styled(View)`
    padding: 0 16px;
`;
export const TextCenter = styled(Text)`
    margin-bottom: 32px;
    font-size: 30px;
    font-family: 'Roboto-Bold';
    text-align: center;
    line-height: 35px;
    color: #212121;
`;

export const RegisterButton = styled(Pressable)`
    margin-top: ${43 - 16 + 'px'};
    margin-bottom: 16px;
    padding: 16px;
    background-color: ${props => {
        if (props.disabled) {
            return '#f6f6f6';
        }
        return '#ff6c00';
    }};
    border-radius: 100px;
`;

export const RegisterButtonText = styled(Text)`
    font-family: 'Roboto-Regular';
    text-align: center;
    color:${props => {
        if (props.disabled) {
            return '#bdbdbd';
        }
        return '#ffffff';
    }};
    font-size: 16px;
    line-height: 19px;
`;

export const LoginNavigateButtonText = styled(Text)`
    font-family: 'Roboto-Regular';
    color: #1b4371;
    text-align: center;
    font-size: 16px;
    line-height: 19px;
`;
