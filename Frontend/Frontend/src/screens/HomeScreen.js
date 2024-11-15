import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '../AppContants'
import { Pressable } from 'react-native-gesture-handler'
import DataManager from '../utils/DataManager'
import ProductItem from '../components/ProductItem'
import { useSelector } from 'react-redux'

const HomeScreen = ({ navigation }) => {
    // const categories = DataManager.shared.getCategories();
    // const products = DataManager.shared.getProducts();

    const categories = useSelector(state => state.listCategoryStore.listCategory)
    const products = useSelector(state => state.listProductStore.listProduct)

    const getProductsByCategory = (categoryId) => {
        return products.filter(product => product.category._id === categoryId).slice(0, 4);
    };

    const renderCategorySection = (category) => {
        const categoryProducts = getProductsByCategory(category._id);

        return (
            <View key={category._id} style={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: '500', marginBottom: 16 }}>{category.name}</Text>
                <FlatList
                    data={categoryProducts}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <ProductItem item={item} onPress={() => navigation.navigate('ProductDetail', { product: item })} />
                    )}
                />
                <Text
                    style={{ fontSize: 16, color: COLORS.textColor, textDecorationLine: 'underline', textAlign: 'right' }}
                    onPress={() => { navigation.navigate('ProductByCate', { category: category }) }}>
                    Xem thêm {category.name}
                </Text>
            </View>
        );
    };

    const renderHeader = () => (
        <View style={styles.bannerContainer}>
            <Image source={require('../assets/img_banner.png')} style={styles.bannerImage} />
            <View style={styles.bannerText}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={{ fontSize: 24, fontWeight: '500', width: '60%' }}>Planta - toả sáng không gian nhà bạn</Text>
                    <Pressable onPress={() => {navigation.navigate('Cart')}} style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/ic_cart.png')} style={{ width: 24, height: 24 }} />
                    </Pressable>
                </View>
                <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#007537' }}>Xem hàng mới về</Text>
                    <Image source={require('../assets/ic_rightArrow.png')} style={{ marginLeft: 5 }} />
                </Pressable>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                ListHeaderComponent={renderHeader}
                keyExtractor={(category) => category._id}
                renderItem={({ item }) => renderCategorySection(item)}
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor
    },
    bannerContainer: {
        backgroundColor: '#F6F6F6'
    },
    bannerImage: {
        width: '100%',
        marginTop: 100
    },
    bannerText: {
        position: 'absolute',
        padding: 20,
        paddingTop: 60
    },
    listView: {
        padding: 16
    }
})