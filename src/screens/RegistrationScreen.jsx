import styled from '@emotion/native';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import AddIcon from '../assets/images/RegistartionScreen/add.png';
import { PrimaryInput } from '../components/PrimaryInput/PrimaryInput';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Container = styled(View)`
    position: relative;
    width: 100%;
    height: 549px;
    padding-top: 92px;
    background-color: #ffffff;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
`;
const PhotoBox = styled(View)`
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-60px);
    height: 120px;
    width: 120px;
    background-color: #f6f6f6;
    border-radius: 16px;
`;

const AddAvatarBtn = styled(Pressable)`
    position: absolute;
    right: -12px;
    bottom: 14px;
    width: 25px;
    height: 25px;
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

const RegisterButton = styled(Pressable)`
    margin-top: ${43 - 16 + 'px'};
    margin-bottom: 16px;
    padding: 16px;
    background-color: #ff6c00;
    border-radius: 100px;
`;

const RegisterButtonText = styled(Text)`
    font-family: 'Roboto-Regular';
    text-align: center;
    color: #ffffff;
    font-size: 16px;
    line-height: 19px;
`;

const LoginNavigateButtonText = styled(Text)`
    font-family: 'Roboto-Regular';
    color: #1b4371;
    text-align: center;
    font-size: 16px;
    line-height: 19px;
`;

export function RegistrationScreen() {
    const navigation = useNavigation();
    const [user, setUser] = useState({
        login: '',
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

    function signUp() {
        console.log(user);
    }

    const { pusher } = styles;
    return (
        <>
            <View style={pusher} />
            <Container>
                <PhotoBox>
                    <AddAvatarBtn onPress={() => Alert.alert('Add avatar')}>
                        <Image source={AddIcon} />
                    </AddAvatarBtn>
                </PhotoBox>

                <FormWrapper>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <TextCenter
                            style={{
                                letterSpacing: 0.01 * 30,
                            }}
                        >
                            Реєстрація
                        </TextCenter>

                        <PrimaryInput
                            placeholderTextColor="#BDBDBD"
                            placeholder="Логін"
                            name="login"
                            makeUser={makeUser}
                        />

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

                        <RegisterButton onPress={signUp}>
                            <RegisterButtonText>
                                Зареєструватись
                            </RegisterButtonText>
                        </RegisterButton>

                        <Pressable onPress={() => navigation.navigate('Login')}>
                            <LoginNavigateButtonText>
                                Вже є обліковий запис? Увійти
                            </LoginNavigateButtonText>
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