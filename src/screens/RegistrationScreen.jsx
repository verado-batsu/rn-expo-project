import styled from '@emotion/native';
import { useFonts } from 'expo-font';
import {
    Alert,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import AddIcon from '../images/RegistartionScreen/add.png';

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
    font-family: 'Roboto-bold';
    text-align: center;
    letter-spacing: ${0.01 * 30};
    line-height: ${35 / 30};
`;

const Input = styled(TextInput)`
    height: 50px;
    padding: 16px;
    margin-bottom: 16px;

    background-color: #f6f6f6;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
`;

const RegisterButton = styled(Pressable)`
    margin-top: 43px;
    margin-bottom: 16px;
    padding: 16px;
    background-color: #ff6c00;
    border-radius: 100px;
`;

const RegisterButtonText = styled(Text)`
    font-family: 'Roboto-regular';
    text-align: center;
    color: #ffffff;
    font-size: 16px;
    line-height: ${19 / 16};
`;

const LoginNavigateButtonText = styled(Text)`
    font-family: 'Roboto-regular';
    color: #1b4371;
    text-align: center;
    font-size: 16px;
    line-height: ${19 / 16};
`;

export function RegistrationScreen() {
    const [fontsLoaded] = useFonts({
        'Roboto-bold': require('../assets/fonts/roboto/Roboto-Bold.ttf'),
        'Roboto-regular': require('../assets/fonts/roboto/Roboto-Regular.ttf'),
        'Roboto-medium': require('../assets/fonts/roboto/Roboto-Medium.ttf'),
    });

    const { pusher } = styles;

    if (!fontsLoaded) {
        return null;
    }

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
                    <TextCenter>Реєстрація</TextCenter>

                    <Input placeholderTextColor="#BDBDBD" placeholder="Логін" />

                    <Input
                        placeholderTextColor="#BDBDBD"
                        placeholder="Адреса електронної пошти"
                    />

                    <Input
                        placeholderTextColor="#BDBDBD"
                        placeholder="Пароль"
                    />

                    <RegisterButton onPress={() => Alert.alert('Register')}>
                        <RegisterButtonText>Зареєструватись</RegisterButtonText>
                    </RegisterButton>

                    <Pressable onPress={() => Alert.alert('LogIn')}>
                        <LoginNavigateButtonText>
                            Вже є обліковий запис? Увійти
                        </LoginNavigateButtonText>
                    </Pressable>
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
