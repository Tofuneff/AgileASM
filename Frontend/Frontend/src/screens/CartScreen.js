import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../AppContants'
import Header from '../components/Header'
import { useSelector } from 'react-redux'

const CartScreen = ({ navigation }) => {
  const carts = useSelector(state => state.listCartStore.listCart)

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const renderCartItem = (item) => {
    return (
      <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' }}>
        <Pressable style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/ic_unselected.png')} style={{ width: 20, height: 20 }} />
        </Pressable>
        <Image source={{ uri: item.product.images[0] }} style={{ width: 80, height: 80, borderRadius: 8, marginLeft: 16 }} />
        <View style={{flex: 2, marginLeft: 16}}>
          <Text style={{ fontSize: 14, color: COLORS.textColor, fontWeight: '500' }}>{item.product.productName} |
            <Text style={{ fontSize: 14, color: '#7b7b7b', fontWeight: '400' }}> {item.product.plantType.name}</Text>
          </Text>

          <Text style={{ fontSize: 16, color: '#007537', fontWeight: '500', marginTop: 8 }}>{formatPrice(item.product.price)}</Text>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>
              <Pressable onPress={() => {
                // if (count > 0) { setcount(count - 1) }
              }}>
                <Image source={require('../assets/ic_minus_black.png')} style={{ width: 24, height: 24 }} />
              </Pressable>
              <Text style={{ fontSize: 16, fontWeight: '500', color: COLORS.textColor, marginHorizontal: 8 }}>{item.quantity}</Text>
              <Pressable onPress={() => {
                // if (count < product.quantity) { setcount(count + 1) }
              }}>
                <Image source={require('../assets/ic_plus.png')} style={{ width: 24, height: 24 }} />
              </Pressable>
            </View>

            <Text style={{ fontSize: 16, color: COLORS.textColor, fontWeight: '500', textDecorationLine: 'underline' }}>Xóa</Text>
          </View>
        </View>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <Header title={'GIỎ HÀNG'} iconRight={carts.length > 0 ? require('../assets/ic_trash.png'): null} onBackPress={() => { navigation.goBack() }} />

      {carts.length === 0 &&
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: COLORS.textColor, width: '100%', textAlign: 'center' }}>Giỏ hàng của bạn hiện đang trống</Text>
        </View>
      }

      {carts.length > 0 &&
        <FlatList
          data={carts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => renderCartItem(item)} />
      }
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor
  }
})