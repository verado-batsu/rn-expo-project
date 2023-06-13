import styled from '@emotion/native';
import {
    Pressable,
    Text,
    View,
} from 'react-native';

export const Container = styled(View)`
    position: relative;
    width: 100%;
    height: 489px;
    padding-top: 32px;
    background-color: #ffffff;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
`;

export const FormWrapper = styled(View)`
    padding: 0 16px;
`;
export const TextCenter = styled(Text)`
    margin-bottom: 32px;
    font-size: 30px;
    font-family: 'Roboto-Bold';
    text-align: center;
    line-height: 35px;
    color: #212121;
`;

export const LogInButton = styled(Pressable)`
    margin-top: ${43 - 16 + 'px'};
    margin-bottom: 16px;
    padding: 16px;
    background-color: #ff6c00;
    border-radius: 100px;
`;

export const LogInButtonText = styled(Text)`
    font-family: 'Roboto-Regular';
    text-align: center;
    color: #ffffff;
    font-size: 16px;
    line-height: 19px;
`;

export const SignInNavigateButtonText = styled(Text)`
    font-family: 'Roboto-Regular';
    color: #1b4371;
    text-align: center;
    font-size: 16px;
    line-height: 19px;
`;

