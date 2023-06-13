import styled from '@emotion/native';
import { Text, View, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';

const PostsContainer = styled(View)`
    flex: 1;
    padding: 24px 16px;

    border-top-width: 0.5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.3);
    background-color: #fff;
`;

const UserContainer = styled(View)``;

const AvatarContainer = styled(View)`
    width: 60px;
    height: 60px;

    border-radius: 16px;
    background-color: #f6f6f6;
`;
const Avatar = styled(Image)`
    width: 60px;
    height: 60px;
    border-radius: 16px;
`;

const InfoContainer = styled(View)``;

export function PostsScreen() {
    const {
        params: { user, post },
    } = useRoute();

    const [avatar, setAvatar] = useState(user.avatar || null);
    console.log('user:', user);
    console.log('post:', post);

    return (
        <PostsContainer>
            <UserContainer>
                <AvatarContainer>
                    <Avatar source={{ uri: avatar }} />
                </AvatarContainer>
                <InfoContainer>
                    <Text>PostsScreen</Text>
                </InfoContainer>
            </UserContainer>
        </PostsContainer>
    );
}
