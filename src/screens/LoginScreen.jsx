import {
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    ImageBackground,
    Dimensions,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { authSignInUser } from '../redux/auth/authOperations';

import { PrimaryInput } from '../components/PrimaryInput/PrimaryInput';

import BackgroundPhoto from '../assets/images/bg.jpg';

import {
    Container,
    FormWrapper,
    TextCenter,
    LogInButton,
    LogInButtonText,
    SignInNavigateButtonText,
} from '../styled-components/LoginScreen.styled';

export function LoginScreen() {
    const dispatch = useDispatch();

    const navigation = useNavigation();

    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [isDisableBtn, setIsDisableBtn] = useState(true);

    useEffect(() => {
        const { email, password } = user;
        if (email && password) {
            setIsDisableBtn(false);
        } else {
            setIsDisableBtn(true);
        }
    }, [user]);

    function makeUser(typeOfUserInfo, userInfo) {
        setUser(prevUser => {
            return {
                ...prevUser,
                [typeOfUserInfo]: userInfo,
            };
        });
    }

    async function logIn() {
        dispatch(authSignInUser(user, navigation));
    }

    const { pusher } = styles;
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ImageBackground
                    resizeMode="cover"
                    source={BackgroundPhoto}
                    style={styles.bgImage}
                >
                    <View style={pusher} />
                    <Container>
                        <FormWrapper>
                            <KeyboardAvoidingView
                                behavior={
                                    Platform.OS === 'ios' ? 'padding' : 'height'
                                }
                            >
                                <TextCenter>Увійти</TextCenter>

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

                                <LogInButton
                                    onPress={logIn}
                                    disabled={isDisableBtn}
                                >
                                    <LogInButtonText disabled={isDisableBtn}>
                                        Увійти
                                    </LogInButtonText>
                                </LogInButton>

                                <Pressable
                                    onPress={() =>
                                        navigation.navigate('Registration')
                                    }
                                >
                                    <SignInNavigateButtonText>
                                        Немає облікового запису? Зареєструватись
                                    </SignInNavigateButtonText>
                                </Pressable>
                            </KeyboardAvoidingView>
                        </FormWrapper>
                    </Container>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    pusher: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        width: window.width,
        height: window.height,
    },
});
