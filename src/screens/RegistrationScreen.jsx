import {
    Image,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';

import { PrimaryInput } from '../components/PrimaryInput/PrimaryInput';

import AddIcon from '../assets/images/RegistartionScreen/add.png';
import RemoveIcon from '../assets/images/RegistartionScreen/remove.png';

import BackgroundPhoto from '../assets/images/bg.jpg';

import {
    Container,
    PhotoBox,
    Photo,
    AddAvatarBtn,
    FormWrapper,
    TextCenter,
    RegisterButton,
    RegisterButtonText,
    LoginNavigateButtonText,
} from '../styled-components/RegistrationScreen.styled';
import { authSignUpUser } from '../redux/auth/authOperations';

export function RegistrationScreen() {
    const dispatch = useDispatch();

    const navigation = useNavigation();

    const [image, setImage] = useState(null);

    const [user, setUser] = useState({
        login: '',
        email: '',
        password: '',
    });
    const [isDisableBtn, setIsDisableBtn] = useState(true);

    useEffect(() => {
        const { login, email, password } = user;
        if (login && email && password) {
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

    function signUp() {
        dispatch(authSignUpUser({ ...user, avatar: image }));
        navigation.navigate('Home');
    }

    async function pickImage() {
        if (!image) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
            return;
        }
        setImage(null);
    }

    const { pusher, container, bgImage } = styles;
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={container}>
                <ImageBackground
                    resizeMode="cover"
                    source={BackgroundPhoto}
                    style={bgImage}
                >
                    <View style={pusher} />
                    <Container>
                        <PhotoBox>
                            {image && <Photo source={{ uri: image }} />}
                            <AddAvatarBtn onPress={pickImage}>
                                <Image source={!image ? AddIcon : RemoveIcon} />
                            </AddAvatarBtn>
                        </PhotoBox>

                        <FormWrapper>
                            <KeyboardAvoidingView
                                behavior={
                                    Platform.OS === 'ios' ? 'padding' : 'height'
                                }
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

                                <RegisterButton
                                    onPress={signUp}
                                    disabled={isDisableBtn}
                                >
                                    <RegisterButtonText disabled={isDisableBtn}>
                                        Зареєструватись
                                    </RegisterButtonText>
                                </RegisterButton>

                                <Pressable
                                    onPress={() => navigation.navigate('Login')}
                                >
                                    <LoginNavigateButtonText>
                                        Вже є обліковий запис? Увійти
                                    </LoginNavigateButtonText>
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
