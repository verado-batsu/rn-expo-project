import styled from '@emotion/native';
import {
    Text,
    View,
    Image,
    TextInput,
    Pressable,
} from 'react-native';

export const CommentsContainer = styled(View)`
    flex: 1;
    padding: 32px 16px 16px;

    border-top-width: 0.5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.3);
    background-color: #fff;
`;

export const PostPhoto = styled(Image)`
    margin-bottom: 32px;
    width: 100%;
    height: 240px;
    border-radius: 8px;
`;

export const CommentContainer = styled(View)`
    display: flex;
    flex-direction: ${props => {
        if (props.commentOwner === props.currentUser) {
            return 'row-reverse';
        } else {
            return 'row';
        }
    }};
    gap: 16px;
    margin-bottom: 24px;
`;
export const AvatarPhoto = styled(Image)`
    width: 28px;
    height: 28px;
    border-radius: 28px;
`;

export const CommentBox = styled(View)`
    padding: 16px;
    border-radius: ${props => {
        if (props.commentOwner === props.currentUser) {
            return '6px 0px 6px 6px';
        } else {
            return '0px 6px 6px 6px';
        }
    }};
    background-color: rgba(0, 0, 0, 0.05);
`;

export const Comment = styled(Text)`
    margin-bottom: 8px;

    color: #212121;
    font-family: 'Roboto-Regular';
    font-size: 13px;
    line-height: 18px;
`;
export const CommentDate = styled(Text)`
    color: #bdbdbd;
    font-family: 'Roboto-Regular';
    font-size: 10px;
`;

export const CommentInput = styled(TextInput)`
    height: 52px;
    padding: 16px 50px 15px 16px;

    font-family: 'Roboto-Regular';
    font-size: 16px;

    background-color: #f6f6f6;

    border-width: 1px;
    border-color: #e8e8e8;
    border-radius: 25px;
`;
export const SendBtn = styled(Pressable)`
    position: absolute;
    width: 34px;
    height: 34px;
    background-color: #ff6c00;
    top: 8px;
    right: 8px;
    border-radius: 17px;

    display: flex;
    justify-content: center;
    align-items: center;
`;