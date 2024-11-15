import { ActivityIndicator, Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { API_URL, COLORS } from '../AppContants'
import TextField from '../components/TextField'
import LinearGradient from 'react-native-linear-gradient'
import LinearButton from '../components/LinearButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DataManager from '../utils/DataManager'
import AppManager from '../utils/AppManager'
import { useDispatch } from 'react-redux'
import { addCarts } from '../redux/reducers/cartReducer'

const LoginScreen = ({ navigation }) => {
    const [emailOrPhone, setemailOrPhone] = useState('')
    const [password, setPassword] = useState('')
    const [rememberAcc, setrememberAcc] = useState(false)
    const [errorLabel, seterrorLabel] = useState('')
    const [loading, setLoading] = useState(false);

    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const dispatch = useDispatch()

    useEffect(() => {
        loadData()
    }, [])

    const handleSubmit = async () => {
        seterrorLabel('');

        if (emailInputRef.current) {
            emailInputRef.current.blur();
        }
        if (passwordInputRef.current) {
            passwordInputRef.current.blur();
        }

        //validate
        if (emailOrPhone === '' || password === '') {
            seterrorLabel('Invalid email or password. Try again!');
            return;
        }

        //submit
        try {
            setLoading(true)
            const res = await fetch(`${API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password,
                    emailOrPhone
                })
            })
            if (res.ok) {
                if (rememberAcc) {
                    AppManager.shared.saveRememberLogin(emailOrPhone, password)
                } else {
                    AppManager.shared.clearLoginData()
                }
                const user = await res.json();
                handleMainRedirect(user)
            } else {
                if (res.status == 400) {
                    seterrorLabel('Invalid email or password. Try again!');
                }
                console.log('Register failed')
                setLoading(false)
            }
        } catch (error) {
            console.log('Register failed ', error);
            setLoading(false)
        }
    };

    const loadData = async () => {
        try {
            const loginData = await AppManager.shared.getLoginData();
            if (loginData.rememberAcc) {
                setemailOrPhone(loginData.emailOrPhone || '');
                setPassword(loginData.password || '');
                setrememberAcc(true);
            }
        } catch (error) {
            console.log('Lỗi khi tải dữ liệu:', error);
        }
    };

    const loadCarts = async () => {
        try {
            const res = await fetch(`${API_URL}/carts/get-carts/${AppManager.shared.getCurrentUser()._id}`);
            const carts = await res.json();
            
            dispatch(addCarts(carts))
            // DataManager.shared.setCarts(carts);
        } catch (error) {
            console.error('Error fetching carts:', error);
        }
    }

    const handleMainRedirect = async (user) => {
        //go to main
        console.log('Successfully');
        // DataManager.shared.setCurrentUser(user)
        AppManager.shared.setCurrentUser(user)
        await loadCarts()
        navigation.navigate('Main')

        setLoading(false)
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Image source={require('../assets/img_header.png')} style={styles.imgHeader} resizeMode='cover' />
                    <Text style={styles.title1}>Chào mừng bạn</Text>
                    <Text style={styles.title2}>Đăng nhập tài khoản</Text>

                    <TextField
                        value={emailOrPhone}
                        placeholder={'Nhập email hoặc số điện thoại'}
                        style={styles.textField}
                        onChangeText={setemailOrPhone}
                        inputRef={emailInputRef}
                    />
                    <TextField
                        value={password}
                        placeholder={'Mật khẩu'}
                        isPassword={true}
                        style={[styles.textField, { marginTop: 10 }]}
                        onChangeText={setPassword}
                        inputRef={passwordInputRef}
                    />
                    {errorLabel && (
                        <Text style={{ color: '#CE0000', fontSize: 11, fontWeight: '600', width: '100%', paddingHorizontal: 25, marginTop: 5 }}>
                            {errorLabel}
                        </Text>
                    )}

                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 16 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Pressable style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }} onTouchEnd={() => setrememberAcc(!rememberAcc)}>
                                <Image source={rememberAcc ? require('../assets/ic_checked.png') : require('../assets/ic_check.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                            </Pressable>
                            <Text style={{ fontWeight: '500', fontSize: 11, color: '#949090' }}>Nhớ tài khoản</Text>
                        </View>

                        <Pressable>
                            <Text style={{ fontWeight: '500', fontSize: 11, color: '#007537' }}>Quên mật khẩu?</Text>
                        </Pressable>
                    </View>

                    <LinearButton colors={['#007537', '#4CAF50']} title={'Đăng nhập'} style={{ marginHorizontal: 16 }} onPress={handleSubmit} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 16 }}>
                        <View style={{ height: 1, flex: 3, backgroundColor: '#4CAF50' }}></View>
                        <Text style={{ fontWeight: '500', fontSize: 12, color: COLORS.textColor, flex: 1, textAlign: 'center' }}>Hoặc</Text>
                        <View style={{ height: 1, flex: 3, backgroundColor: '#4CAF50' }}></View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 32 }}>
                        <Pressable style={{ marginEnd: 8 }}>
                            <Image source={require('../assets/ic_google.png')} style={{ width: 32, height: 32 }} resizeMode='contain' />
                        </Pressable>

                        <Pressable style={{ marginStart: 8 }}>
                            <Image source={require('../assets/ic_facebook.png')} style={{ width: 32, height: 32 }} resizeMode='contain' />
                        </Pressable>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 32 }}>
                        <Text style={{ fontWeight: '400', fontSize: 12, color: COLORS.textColor }}>Bạn không có tài khoản? </Text>

                        <Pressable onTouchEnd={() => { navigation.navigate('Register') }}>
                            <Text style={{ fontWeight: '400', fontSize: 12, color: '#009245' }}>Tạo tài khoản</Text>
                        </Pressable>
                    </View>

                    {loading && (
                        <View style={styles.gradient}>
                            <ActivityIndicator size="large" color="#ffffff" />
                        </View>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    gradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imgHeader: {
        position: 'absolute',
        width: 482.31,
        height: 487.09,
        top: -150,
    },
    title1: {
        fontSize: 30,
        fontWeight: '700',
        color: COLORS.textColor,
        marginTop: 337.09,
    },
    title2: {
        fontSize: 18,
        fontWeight: '400',
        color: COLORS.textColor,
        marginTop: 5,
    },
    textField: {
        marginTop: 20,
        marginHorizontal: 16
    },

})