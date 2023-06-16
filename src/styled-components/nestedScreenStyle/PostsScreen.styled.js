import styled from '@emotion/native';
import { Text, View, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const MainContainer = styled(View)`
    flex: 1;
    padding: 24px 16px;

    border-top-width: 0.5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.3);
    background-color: #fff;
`;

export const UserContainer = styled(View)`
    margin-bottom: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

export const AvatarContainer = styled(View)`
    width: 60px;
    height: 60px;

    border-radius: 16px;
    background-color: #e6e6e6;
`;
export const Avatar = styled(Image)`
    width: 60px;
    height: 60px;
    border-radius: 16px;
`;

export const UserName = styled(Text)`
    font-family: 'Roboto-Bold';
    font-size: 13px;
    line-height: 15px;
    color: #212121;
`;
export const UserEmail = styled(Text)`
    font-family: 'Roboto-Regular';
    font-size: 11px;
    line-height: 13px;
    color: rgba(33, 33, 33, 0.8);
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
export const PostCommentsLabel = styled(Text)`
    font-family: 'Roboto-Regular';
    font-size: 16px;
    line-height: 19px;
    color: #bdbdbd;
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