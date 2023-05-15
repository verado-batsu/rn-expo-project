import styled from '@emotion/native';
import {
    Alert,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { PrimaryInput } from '../components/PrimaryInput/PrimaryInput';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Container = styled(View)`
    position: relative;
    width: 100%;
    height: 489px;
    padding-top: 32px;
    background-color: #ffffff;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
`;

const FormWrapper = styled(View)`
    padding: 0 16px;
`;
const TextCenter = styled(Text)`
    margin-bottom: 32px;
    font-size: 30px;
    font-family: 'Roboto-Bold';
    text-align: center;
    line-height: 35px;
    color: #212121;
`;

const LogInButton = styled(Pressable)`
    margin-top: ${43 - 16 + 'px'};
    margin-bottom: 16px;
    padding: 16px;
    background-color: #ff6c00;
    border-radius: 100px;
`;

const LogInButtonText = styled(Text)`
    font-family: 'Roboto-Regular';
    text-align: center;
    color: #ffffff;
    font-size: 16px;
    line-height: 19px;
`;

const SignInNavigateButtonText = styled(Text)`
    font-family: 'Roboto-Regular';
    color: #1b4371;
    text-align: center;
    font-size: 16px;
    line-height: 19px;
`;

export function LoginScreen() {
    const navigation = useNavigation();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    function makeUser(typeOfUserInfo, userInfo) {
        setUser(prevUser => {
            return {
                ...prevUser,
                [typeOfUserInfo]: userInfo,
            };
        });
    }

    function logIn() {
        console.log(user);
    }

    const { pusher } = styles;
    return (
        <>
            <View style={pusher} />
            <Container>
                <FormWrapper>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <TextCenter
                            style={
                                {
                                    // letterSpacing: 0.01 * 30,
                                }
                            }
                        >
                            Увійти
                        </TextCenter>

                        <PrimaryInput
                            placeholderTextColor="#BDBDBD"
                            placeholder="Адреса електронної пошти"
                            name="email"
                            makeUser={makeUser}
                        />

                        <PrimaryInput
                            placeholderTextColor="#BDBDBD"
                            placeholder="Пароль"
                            name="password"
                            makeUser={makeUser}
                        />

                        <LogInButton onPress={logIn}>
                            <LogInButtonText>Увійти</LogInButtonText>
                        </LogInButton>

                        <Pressable
                            onPress={() => navigation.navigate('Registration')}
                        >
                            <SignInNavigateButtonText>
                                Немає облікового запису? Зареєструватись
                            </SignInNavigateButtonText>
                        </Pressable>
                    </KeyboardAvoidingView>
                </FormWrapper>
            </Container>
        </>
    );
}

const styles = StyleSheet.create({
    pusher: {
        flex: 1,
    },
});
