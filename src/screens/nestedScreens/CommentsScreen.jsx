import styled from '@emotion/native';
import { useRoute } from '@react-navigation/native';
import { Text, View, Image, TextInput, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

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
const SendBtn = styled(Pressable)`
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

export function CommentsScreen() {
    const {
        params: { postsPhoto },
    } = useRoute();

    return (
        <CommentsContainer>
            <PostPhoto source={{ uri: postsPhoto }} />
            <View style={{ flex: 1 }}>
                <Text>CommentsScreen</Text>
            </View>
            <View style={{ position: 'relative' }}>
                <CommentInput
                    placeholder="Коментувати..."
                    placeholderTextColor="#BDBDBD"
                />
                <SendBtn>
                    <AntDesign name="arrowup" size={20} color="#FFFFFF" />
                </SendBtn>
            </View>
        </CommentsContainer>
    );
}
