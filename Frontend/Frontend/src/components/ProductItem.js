import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../AppContants'
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth - (20 * 2 + 16)) / 2;

const ProductItem = ({ item, onPress }) => {

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN') + 'đ';
    };
    return (
        <View onTouchEnd={onPress}>
            <Image source={{ uri: item.images[0] }} style={{ width: imageWidth, aspectRatio: 1.15, borderRadius: 8 }} />
            <Text style={{ fontSize: 16, color: COLORS.textColor, fontWeight: '500' }}>{item.productName}</Text>
            <Text style={{ fontSize: 14, color: '#7D7B7B', fontWeight: '400' }}>{item.category.name}</Text>
            <Text style={{ fontSize: 16, color: '#007537', fontWeight: '500' }}>{formatPrice(item.price)}</Text>
        </View>
    )
}

export default ProductItem

const styles = StyleSheet.create({})