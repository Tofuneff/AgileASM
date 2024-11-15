import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = ({ title, iconRight, onBackPress, onCartPress }) => {
    return (
        <View style={styles.container}>
            <Pressable onPress={onBackPress}>
                <Image source={onBackPress ? require('../assets/ic_back.png') : null} style={{ width: 24, height: 24 }} />
            </Pressable>

            <Text style={{ fontWeight: '500', fontSize: 16 }}>{title}</Text>

            <Pressable onPress={iconRight === null ? null : onCartPress}>
                <Image source={iconRight} style={{ width: 24, height: 24 }} />
            </Pressable>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 55,
        paddingHorizontal: 24,

    }
})