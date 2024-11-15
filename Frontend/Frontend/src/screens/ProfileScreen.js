import { Alert, Image, Pressable, SectionList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { COLORS } from '../AppContants'
import Header from '../components/Header'
import DataManager from '../utils/DataManager'
import { useFocusEffect } from '@react-navigation/native'
import AppManager from '../utils/AppManager'

const ProfileScreen = ({ navigation }) => {
  // const user = DataManager.shared.getCurrentUser()
  const user = AppManager.shared.getCurrentUser()
  const [avatar, setAvatar] = useState(null)

  useFocusEffect(
    useCallback(() => {
      updateAvatar()
    }, [])
  )

  const updateAvatar = () => {
    // const user = DataManager.shared.getCurrentUser();
    const user = AppManager.shared.getCurrentUser();
    setAvatar(user.avatar);
}

  const listData = [
    {
      title: 'Chung',
      data: ['Chỉnh sửa thông tin', 'Cẩm nang trồng cây', 'Lịch sử giao dịch', 'Q & A']
    },
    {
      title: 'Bảo mật và Điều khoản',
      data: ['Điều khoản và điều kiện', 'Chính sách và quyền riêng tư', 'Đăng xuất']
    },
  ]

  const renderItem = ({ item }) => (
    <Pressable onPress={() => { handleItemPress(item) }}>
      <Text style={{ color: item === 'Đăng xuất' ? '#FF0000' : COLORS.textColor, fontSize: 16, fontWeight: '500', marginVertical: 8 }}>{item}</Text>
    </Pressable>
  );

  const handleItemPress = (item) => {
    switch (item) {
      case 'Chỉnh sửa thông tin':
        navigation.navigate('UpdateInfo', { title: 'CHỈNH SỬA THÔNG TIN' });
        break;
      case 'Cẩm nang trồng cây':
        Alert.alert('Bạn chọn Cẩm nang trồng cây');
        break;
      case 'Lịch sử giao dịch':
        Alert.alert('Bạn chọn Lịch sử giao dịch');
        break;
      case 'Q & A':
        navigation.navigate('QandA', { title: 'Q & A' });
        break;
      case 'Điều khoản và điều kiện':
        Alert.alert('Bạn chọn Điều khoản và điều kiện');
        break;
      case 'Chính sách quyền riêng tư':
        Alert.alert('Bạn chọn Chính sách quyền riêng tư');
        break;
      case 'Đăng xuất':
        navigation.replace('Login');
        // DataManager.shared.setCurrentUser(null);
        AppManager.shared.setCurrentUser(null);
        break;
      default:
        break;
    }
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <View>
      <Text style={{ color: '#7F7F7F', fontSize: 16, fontWeight: '400', marginBottom: 4, marginTop: 16 }}>{title}</Text>
      <View style={{ height: 1, backgroundColor: '#7F7F7F', marginVertical: 8 }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={'PROFILE'} iconRight={null} />

      <View style={{ flexDirection: 'row' }}>
        <Image source={avatar? {uri: user.avatar} : require('../assets/ic_avatar.png')} style={{ width: 40, height: 40, borderRadius: 20 }} />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ color: COLORS.textColor, fontWeight: '500', fontSize: 16 }}>{user.name}</Text>
          <Text style={{ color: '#7F7F7F', fontWeight: '400', fontSize: 14 }}>{user.email}</Text>
        </View>
      </View>

      <SectionList
        sections={listData}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={{}}
      />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    paddingHorizontal: 40
  }
})