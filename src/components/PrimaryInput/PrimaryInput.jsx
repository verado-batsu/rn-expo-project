import styled from '@emotion/native';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

const Input = styled(TextInput)`
    padding: 16px;

    font-family: 'Roboto-Regular';
    font-size: 16px;
    line-height: 19px;

    background-color: #f6f6f6;
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ isFocused }) => {
        if (isFocused) {
            return '#FF6C00';
        }
        return '#e8e8e8';
    }};
`;

const RevealBtn = styled(Pressable)`
    position: absolute;
    display: flex;
    top: 0;
    right: 0;
    height: 100%;
    justify-content: center;
    padding-right: 16px;
`;
const RevealBtnText = styled(Text)`
    font-family: 'Roboto-Regular';
    font-size: 16px;
    line-height: 19px;
    color: #1b4371;
`;

export function PrimaryInput({ makeUser, ...props }) {
    const [isFocused, setIsFocused] = useState(null);
    const [shouldShow, setShouldShow] = useState(() => {
        return props.name === 'password' ? true : false;
    });

    function onFocus() {
        setIsFocused(true);
    }
    function onBlur() {
        setIsFocused(false);
    }

    return (
        <View style={{ position: 'relative', marginBottom: 16 }}>
            <Input
                isFocused={isFocused}
                onChangeText={text => {
                    makeUser(props.name, text);
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                secureTextEntry={shouldShow}
                {...props}
            />
            {props.name === 'password' && (
                <RevealBtn
                    onPress={() => {
                        setShouldShow(prev => !prev);
                    }}
                >
                    <RevealBtnText>
                        {shouldShow ? 'Показати' : 'Приховати'}
                    </RevealBtnText>
                </RevealBtn>
            )}
        </View>
    );
}
