import styled from '@emotion/native';
import { useRoute } from '@react-navigation/native';
import {
    Text,
    View,
    Image,
    TextInput,
    Pressable,
    SafeAreaView,
    FlatList,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    onSnapshot,
} from 'firebase/firestore';
import moment from 'moment';

import { db } from '../../../config';

import { AntDesign } from '@expo/vector-icons';
import { selectUser } from '../../redux/selectors';

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
    const { userId, avatar } = useSelector(selectUser);

    const {
        params: { postsPhoto, postId },
    } = useRoute();

    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        getAllComments();
    }, []);

    async function createComment() {
        try {
            if (comment) {
                const date = moment.utc().format();
                await addDoc(collection(db, 'posts', postId, 'comments'), {
                    comment,
                    avatar,
                    date,
                    userId,
                });
                setComment('');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getAllComments() {
        try {
            await onSnapshot(
                collection(db, 'posts', postId, 'comments'),
                snapshot => {
                    let newComments = [];
                    snapshot.forEach(doc => {
                        newComments = [
                            ...newComments,
                            { id: doc.id, ...doc.data() },
                        ];
                    });
                    setAllComments(newComments);
                    updateDoc(doc(db, 'posts', postId), {
                        numberOfComments: newComments.length,
                    });
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CommentsContainer>
            <PostPhoto source={{ uri: postsPhoto }} />
            <SafeAreaView style={{ flex: 1, marginBottom: 10 }}>
                <FlatList
                    data={allComments}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <CommentContainer
                            commentOwner={item.userId}
                            currentUser={userId}
                        >
                            <AvatarPhoto source={{ uri: item.avatar }} />
                            <CommentBox
                                style={{
                                    flexGrow: 1,
                                    flex: 1,
                                }}
                                commentOwner={item.userId}
                                currentUser={userId}
                            >
                                <Comment>{item.comment}</Comment>
                                <CommentDate>
                                    {moment(item.date).format('LL | H:mm')}
                                </CommentDate>
                            </CommentBox>
                        </CommentContainer>
                    )}
                />
            </SafeAreaView>
            <View style={{ position: 'relative' }}>
                <CommentInput
                    placeholder="Коментувати..."
                    placeholderTextColor="#BDBDBD"
                    onChangeText={setComment}
                    value={comment}
                />
                <SendBtn onPress={createComment}>
                    <AntDesign name="arrowup" size={20} color="#FFFFFF" />
                </SendBtn>
            </View>
        </CommentsContainer>
    );
}
