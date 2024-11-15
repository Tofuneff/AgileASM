import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import { API_URL, COLORS } from '../AppContants';
import { TextInput } from 'react-native-gesture-handler';
import DataManager from '../utils/DataManager';
import LinearButton from '../components/LinearButton';
import { launchImageLibrary } from 'react-native-image-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { set } from 'mongoose';
import { deleteObject, getStorage, ref } from '@react-native-firebase/storage';
import AppManager from '../utils/AppManager';

const UpdateInfo = ({ route, navigation }) => {
    const { title } = route.params;
    // const user = DataManager.shared.getCurrentUser()
    const user = AppManager.shared.getCurrentUser()
    const [currentUser, setCurrentUser] = useState(user);
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [address, setAddress] = useState(user.address)
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
    const [tempAva, setTempAva] = useState(user.avatar)

    const [loading, setLoading] = useState(false);
    const [errorLabel, seterrorLabel] = useState('')

    const checkToggleButton = () => {
        return (
            name !== currentUser.name ||
            email !== currentUser.email ||
            address !== currentUser.address ||
            phoneNumber !== currentUser.phoneNumber ||
            tempAva !== currentUser.avatar
        );
    }

    const requestPhotoLibraryPermission = async () => {
        let permission;

        if (Platform.OS === 'ios') {
            permission = PERMISSIONS.IOS.PHOTO_LIBRARY
        } else if (Platform.OS === 'android') {
            if (Platform.Version >= 33) {
                permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
                console.log(permission);
            } else {
                permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
                console.log(permission);
            }
        }

        const result = await request(permission);

        if (result === RESULTS.GRANTED) {
            console.log('Permission already granted');
            pickImage();
        } else if (result === RESULTS.DENIED) {
            const newResult = await request(permission);
            if (newResult === RESULTS.GRANTED) {
                console.log('Permission granted');
                pickImage();
            } else {
                console.log('Permission denied');
            }
        } else {
            console.log('Permission not available');
        }
    };

    const pickImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: true
        }

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets) {
                const selectedImage = response.assets[0]
                console.log(selectedImage.uri)
                setTempAva(selectedImage.uri)
            }
        })
    }

    const uploadImageToFirebase = async (uri, oldImageUrl) => {
        if (!uri) return null;

        const storage = getStorage();

        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        console.log('Filename:', filename);

        const storageRef = ref(storage, `images/${user._id}/${filename}`);

        if (oldImageUrl) {
            const oldImagePath = oldImageUrl
                .substring(oldImageUrl.indexOf('/o/') + 3, oldImageUrl.indexOf('?alt=media'));

            const oldImageRef = ref(storage, decodeURIComponent(oldImagePath));
            try {
                await deleteObject(oldImageRef);
                console.log('Old image deleted successfully!');
            } catch (error) {
                console.error('Error deleting old image:', error);
            }
        }

        const task = storageRef.putFile(uri);

        try {
            await task;
            console.log('Image uploaded to Firebase successfully!');

            const downloadURL = await storageRef.getDownloadURL();
            return downloadURL;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const updateUserInformation = async () => {
        try {
            //validate
            if (name === '' || email === '' || phoneNumber === '' || address === '') {
                seterrorLabel('Invalid email or password. Try again!');
                return;
            }

            setLoading(true)

            let uploadedAvatarUrl = tempAva;
            if (tempAva !== user.avatar) {
                uploadedAvatarUrl = await uploadImageToFirebase(tempAva, user.avatar);
                setTempAva(uploadedAvatarUrl);
            }

            if (!uploadedAvatarUrl) {
                setLoading(false);
                seterrorLabel('Lỗi upload ảnh. Vui lòng thử lại!');
                return;
            }
            const requestBody = {
                name,
                email,
                address,
                phoneNumber,
                avatar: uploadedAvatarUrl,
            };

            console.log("Request Body:", requestBody);
            const res = await fetch(`${API_URL}/users/update/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            })

            if (res.ok) {
                setLoading(false)
                console.log('Update user information successfully')
                const result = await res.json()
                console.log(result.user);
                setCurrentUser(result.user)
                // DataManager.shared.setCurrentUser(result.user)
                AppManager.shared.setCurrentUser(result.user)
            } else {
                setLoading(false)
                console.log('Update user information failed')
            }
        } catch (error) {
            setLoading(false)
            console.log('Update user information failed ', error)
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Header title={title} iconRight={null} onBackPress={() => { navigation.goBack() }} />

                <View style={{ paddingHorizontal: 40, flex: 1 }}>
                    <Pressable onPress={() => requestPhotoLibraryPermission()}>
                        <Image
                            source={tempAva ? { uri: tempAva } : require('../assets/ic_avatar.png')}
                            style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginVertical: 32 }}
                        />
                    </Pressable>
                    <Text style={{ color: COLORS.textColor, fontWeight: '400', fontSize: 14 }}>Thông tin sẽ được lưu cho lần mua kế tiếp. Bấm vào thông tin chi tiết để chỉnh sửa.</Text>
                    <TextInput value={name} placeholder={name} onChangeText={setName} style={{ borderBottomWidth: 1, borderBottomColor: '#7D7B7B', marginTop: 32 }} />
                    <TextInput value={email} placeholder={email} onChangeText={setEmail} style={{ borderBottomWidth: 1, borderBottomColor: '#7D7B7B' }} />
                    <TextInput value={address} placeholder={address ? address : 'Nhập địa chỉ'} onChangeText={setAddress} style={{ borderBottomWidth: 1, borderBottomColor: '#7D7B7B' }} />
                    <TextInput value={phoneNumber} placeholder={phoneNumber} onChangeText={setPhoneNumber} style={{ borderBottomWidth: 1, borderBottomColor: '#7D7B7B' }} />
                    {errorLabel && <Text style={{ color: '#CE0000', fontSize: 11, fontWeight: '600', width: '100%', marginTop: 5 }}>{errorLabel}</Text>}
                </View>

                <LinearButton
                    colors={checkToggleButton() ? ['#007537', '#007537'] : ['#ABABAB', '#ABABAB']}
                    title={'LƯU THÔNG TIN'}
                    onPress={updateUserInformation}
                    enable={!checkToggleButton()}
                    style={{ marginBottom: 30, marginHorizontal: 20 }}
                />

                {loading &&
                    <View style={styles.gradient}>
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default UpdateInfo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
    },
    gradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
})