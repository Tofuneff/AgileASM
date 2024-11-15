import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const LinearButton = ({ colors, title, style, onPress, enable }) => {
    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.btnSubmit, style]}>
            <TouchableOpacity disabled={enable} onPress={onPress} style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.btnSubmitText}>{title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default LinearButton

const styles = StyleSheet.create({
    btnSubmit: {
        alignSelf: 'stretch',
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    btnSubmitText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20
    }
})