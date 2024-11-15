import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Image, Pressable } from 'react-native';
import { COLORS } from '../AppContants';



const TextField = ({ placeholder, isPassword = false, style, onChangeText, inputRef, value }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    let eyeIcon;
    if (isPassword) {
        eyeIcon = (
            <Pressable
                style={[styles.eyeIcon]}
                onPress={() => setShowPassword(!showPassword)}
            >
                <Image
                    source={showPassword ? require('../assets/ic_eye.png') : require('../assets/ic_eyeHidden.png')}
                    style={styles.icon}
                    resizeMode='contain'
                />
            </Pressable>
        );
    }

    return (
        <View style={[styles.container, style, { borderColor: isFocused ? '#007537' : '#8B8B8B', borderWidth: isFocused ? 2 : 1 }]}>
            <TextInput
                value={value}
                ref={inputRef}
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={COLORS.secondTextColor}
                secureTextEntry={isPassword && !showPassword}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {eyeIcon}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: '#8B8B8B',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 46,
        fontSize: 12,
        fontWeight: '400',
        color: COLORS.textColor,
    },
    eyeIcon: {
        height: 48,
        width: 48,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
    },
});

export default TextField;
