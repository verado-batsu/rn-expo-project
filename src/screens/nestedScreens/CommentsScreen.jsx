import { useRoute } from '@react-navigation/native';
import { View, SafeAreaView, FlatList } from 'react-native';
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
import {
    AvatarPhoto,
    Comment,
    CommentBox,
    CommentContainer,
    CommentDate,
    CommentInput,
    CommentsContainer,
    SendBtn,
} from '../../styled-components/nestedScreenStyle/CommentsScreen.styled';
import { PostPhoto } from '../../styled-components/nestedScreenStyle/PostsScreen.styled';

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
