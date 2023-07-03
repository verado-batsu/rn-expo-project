import styled from '@emotion/native';

import {
    View,
    Image,
    Pressable,
    Text,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export const ProfileContainer = styled(View)`
    position: relative;
    height: 500px;
    padding-top: 92px;
    padding-bottom: 32px;
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

export const EmptyPostText = styled(Text)`
    text-align: center;
    font-family: 'Roboto-Medium';
    font-size: 24px;
    letter-spacing: 0.3px;
`;

export const PostContainer = styled(View)`
    margin-bottom: 32px;
`;

export const PostPhoto = styled(Image)`
    margin-bottom: 8px;
    width: 100%;
    height: 240px;
    border-radius: 8px;
`;

export const PostTitle = styled(Text)`
    margin-bottom: 8px;

    font-family: 'Roboto-Medium';
    font-size: 16px;
    line-height: 19px;
    color: #212121;
`;

export const PostInfo = styled(View)`
    flex-direction: row;
    justify-content: space-between;
`;

export const PostCommentsBtn = styled(Pressable)`
    flex-direction: row;
    align-items: center;
    gap: 6px;
`;
export const MessageCirle = styled(Feather)`
    transform: scaleX(-1);
`;
export const PostCommentsNumber = styled(Text)`
    font-family: 'Roboto-Regular';
    font-size: 16px;
    line-height: 19px;
    color: ${props => {
        if (props.numberOFCommets === 0) {
            return '#bdbdbd';
        } else {
            return '#212121';
        }
    }};
`;

export const PostLocationBtn = styled(Pressable)`
    flex-direction: row;
    align-items: center;
    gap: 3px;
`;
export const PostLocationLabel = styled(Text)`
    font-family: 'Roboto-Regular';
    font-size: 16px;
    line-height: 19px;
    text-decoration-line: underline;
    color: #212121;
`;
