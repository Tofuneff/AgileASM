import { Button, Image, KeyboardAvoidingView, Linking, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { API_URL, COLORS } from '../AppContants'
import TextField from '../components/TextField'
import LinearGradient from 'react-native-linear-gradient'
import LinearButton from '../components/LinearButton'
import LottieView from 'lottie-react-native'

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')

    const [errorLabel, seterrorLabel] = useState('')

    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const phoneNumberInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const [isModalVisible, setModalVisible] = useState(false);

    const handleSubmit = async () => {
        seterrorLabel('');

        if (emailInputRef.current) {
            emailInputRef.current.blur();
        }
        if (passwordInputRef.current) {
            passwordInputRef.current.blur();
        }
        if (nameInputRef.current) {
            nameInputRef.current.blur();
        }
        if (phoneNumberInputRef.current) {
            phoneNumberInputRef.current.blur();
        }

        //validate
        if (name === '' || email === '' || phoneNumber === '' || password === '') {
            seterrorLabel('Invalid email or password. Try again!');
            return;
        }

        // submit
        try {
            const res = await fetch(`${API_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    phoneNumber,
                    password
                })
            })
            if (res.ok) {
                console.log('Successfully');
                setModalVisible(true)
            } else {
                if (res.status == 404) {
                    seterrorLabel('Invalid email or password. Try again!');
                }
                console.log('Register failed')
            }
        } catch (error) {
            console.log('Register failed ', error);
        }
    };

    const handleLoginRedirect = () => {
        navigation.goBack();
        setModalVisible(false);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Image source={require('../assets/img_header.png')} style={styles.imgHeader} resizeMode='cover' />

                    <Text style={styles.title1}>Đăng ký</Text>
                    <Text style={styles.title2}>Tạo tài khoản</Text>

                    <TextField placeholder={'Họ tên'} style={[styles.textField, { marginTop: 10 }]} onChangeText={setName} inputRef={nameInputRef} />
                    <TextField placeholder={'Email'} style={[styles.textField, { marginTop: 10 }]} onChangeText={setEmail} inputRef={emailInputRef} />
                    <TextField placeholder={'Số điện thoại'} style={[styles.textField, { marginTop: 10 }]} onChangeText={setPhoneNumber} inputRef={phoneNumberInputRef} />
                    <TextField placeholder={'Mật khẩu'} isPassword={true} style={[styles.textField, { marginTop: 10 }]} onChangeText={setPassword} inputRef={passwordInputRef} />
                    {errorLabel && <Text style={{ color: '#CE0000', fontSize: 11, fontWeight: '600', width: '100%', paddingHorizontal: 25, marginTop: 5 }}>{errorLabel}</Text>}

                    <Text style={styles.condition}>
                        Để đăng ký tài khoản, bạn đồng ý{' '}
                        <Text style={styles.link} onPress={() => Linking.openURL('https://google.com')}>
                            Terms & {"\n"}Conditions
                        </Text>
                        {' and '}
                        <Text style={styles.link} onPress={() => Linking.openURL('https://google.com')}>
                            Privacy Policy
                        </Text>
                    </Text>

                    <LinearButton colors={['#007537', '#4CAF50']} title={'Đăng ký'} style={{ marginHorizontal: 16 }} onPress={handleSubmit} />

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
                        <Text style={{ fontWeight: '400', fontSize: 12, color: COLORS.textColor }}>Tôi đã có tài khoản </Text>

                        <Pressable onTouchEnd={() => { navigation.goBack() }}>
                            <Text style={{ fontWeight: '400', fontSize: 12, color: '#009245' }}>Đăng nhập</Text>
                        </Pressable>
                    </View>

                    <Modal visible={isModalVisible} animationType='fade' transparent={true}>
                        <View style={styles.modalContainer}>
                            <Pressable style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }} onPress={() => { setModalVisible(false) }}></Pressable>
                            <View style={styles.modalView}>
                                <Text style={{ fontSize: 20, marginBottom: 20 }}>Đăng ký thành công!</Text>
                                <LottieView
                                    source={require('../assets/success.json')}
                                    autoPlay
                                    loop={false}
                                    style={{ width: 100, height: 100 }}
                                    speed={1.5}
                                    resizeMode='contain'
                                />
                                <LinearButton colors={['#007537', '#4CAF50']} title={'Đăng nhập'} onPress={handleLoginRedirect} style={{ width: 200 }} />
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>


    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imgHeader: {
        position: 'absolute',
        width: 482.31,
        height: 487.09,
        top: -250,
    },
    title1: {
        fontSize: 30,
        fontWeight: '700',
        color: COLORS.textColor,
        marginTop: 237.09,
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
    condition: {
        fontSize: 12,
        color: COLORS.textColor,
        textAlign: 'center',
        marginTop: 16
    },
    link: {
        color: '#009245',
        textDecorationLine: 'underline'
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#00000050',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        borderRadius: 15,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
})