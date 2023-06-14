import styled from '@emotion/native';
import { Text, View, Image, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

const MainContainer = styled(View)`
    flex: 1;
    padding: 24px 16px;

    border-top-width: 0.5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.3);
    background-color: #fff;
`;

const UserContainer = styled(View)`
    margin-bottom: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

const AvatarContainer = styled(View)`
    width: 60px;
    height: 60px;

    border-radius: 16px;
    background-color: #e6e6e6;
`;
const Avatar = styled(Image)`
    width: 60px;
    height: 60px;
    border-radius: 16px;
`;

const InfoContainer = styled(View)``;
const UserName = styled(Text)`
    font-family: 'Roboto-Bold';
    font-size: 13px;
    line-height: 15px;
    color: #212121;
`;
const UserEmail = styled(Text)`
    font-family: 'Roboto-Regular';
    font-size: 11px;
    line-height: 13px;
    color: rgba(33, 33, 33, 0.8);
`;

const PostContainer = styled(View)`
    margin-bottom: 32px;
`;

const PostPhoto = styled(Image)`
    margin-bottom: 8px;
    width: 100%;
    height: 240px;
    border-radius: 8px;
`;

const PostTitle = styled(Text)`
    margin-bottom: 8px;

    font-family: 'Roboto-Medium';
    font-size: 16px;
    line-height: 19px;
    color: #212121;
`;

const PostInfo = styled(View)`
    flex-direction: row;
    justify-content: space-between;
`;

const PostCommentsBtn = styled(Pressable)`
    flex-direction: row;
    align-items: center;
    gap: 6px;
`;
const MessageCirle = styled(Feather)`
    transform: scaleX(-1);
`;
const PostCommentsLabel = styled(Text)`
    font-family: 'Roboto-Regular';
    font-size: 16px;
    line-height: 19px;
    color: #bdbdbd;
`;

const PostLocationBtn = styled(Pressable)`
    flex-direction: row;
    align-items: center;
    gap: 3px;
`;
const PostLocationLabel = styled(Text)`
    font-family: 'Roboto-Regular';
    font-size: 16px;
    line-height: 19px;
    text-decoration-line: underline;
    color: #212121;
`;

export function PostsScreen() {
    const {
        params: { user, post },
    } = useRoute();

    const [userInfo, setUserInfo] = useState(user || null);
    const [posts, setPosts] = useState([]);
    console.log('posts:', posts);

    useEffect(() => {
        if (post) {
            setPosts(prev => [...prev, post]);
        }
    }, [post]);

    return (
        <MainContainer>
            <UserContainer>
                <AvatarContainer>
                    {userInfo && userInfo.avatar && (
                        <Avatar source={{ uri: userInfo.avatar }} />
                    )}
                </AvatarContainer>
                <InfoContainer>
                    <UserName>
                        {userInfo && userInfo.login ? userInfo.login : 'Anonim'}
                    </UserName>
                    <UserEmail>
                        {userInfo && userInfo.email
                            ? userInfo.email
                            : 'Anonim.@gmail.com'}
                    </UserEmail>
                </InfoContainer>
            </UserContainer>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <PostContainer>
                            <PostPhoto source={{ uri: item.photo.uri }} />
                            <PostTitle>{item.title}</PostTitle>
                            <PostInfo>
                                <PostCommentsBtn>
                                    <MessageCirle
                                        name="message-circle"
                                        size={24}
                                        color="#BDBDBD"
                                    />
                                    <PostCommentsLabel>0</PostCommentsLabel>
                                </PostCommentsBtn>
                                <PostLocationBtn>
                                    <Feather
                                        name="map-pin"
                                        size={24}
                                        color="#BDBDBD"
                                    />
                                    <PostLocationLabel>
                                        {item.position}
                                    </PostLocationLabel>
                                </PostLocationBtn>
                            </PostInfo>
                        </PostContainer>
                    );
                }}
            />
        </MainContainer>
    );
}
