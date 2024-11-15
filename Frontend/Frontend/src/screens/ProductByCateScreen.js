import { FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../AppContants'
import Header from '../components/Header'
import DataManager from '../utils/DataManager'
import ProductItem from '../components/ProductItem'
import { useSelector } from 'react-redux'

const ProductByCateScreen = ({ route, navigation }) => {

    const { category } = route.params;
    // const allProducts = DataManager.shared.getProducts().filter(product => product.category._id === category._id);
    // const plantTypes = DataManager.shared.getPlantTypes();
    const allProducts = useSelector(state => state.listProductStore.listProduct).filter(product => product.category._id === category._id);
    const plantTypes = useSelector(state => state.listPlantTypeStore.listPlantType);

    const [displayPlantTypes, setDisplayPlantTypes] = useState([{ name: 'All' }, ...plantTypes]);
    const [selectedPlantType, setSelectedPlantType] = useState('All');
    const [selectedProducts, setselectedProducts] = useState(allProducts);

    const handleSelectedPlantType = (name) => {
        setSelectedPlantType(name);

        if (name === 'All') {
            setselectedProducts(allProducts);
        } else {
            let selectedProducts = allProducts.filter(product => product.plantType.name === name);
            setselectedProducts(selectedProducts);
        }
    }

    const renderHeader = () => (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginBottom: 16 }}>
            {displayPlantTypes.map(plantType => (
                <Pressable key={plantType.name} onPress={() => handleSelectedPlantType(plantType.name)} style={selectedPlantType == plantType.name ? styles.menuItemSelected : styles.menuItem}>
                    <Text style={[styles.menuText, selectedPlantType === plantType.name ? styles.selectedMenuText : null]}>
                        {plantType.name}
                    </Text>
                </Pressable>
            ))}
        </ScrollView>
    );

    return (
        <View style={styles.container}>
            <Header title={category.name} iconRight={require('../assets/ic_cart.png')} onBackPress={() => { navigation.goBack() }} onCartPress={() => {navigation.navigate('Cart')}} />

            <View style={{ padding: 20, paddingTop: 0 }}>

                <FlatList
                    data={selectedProducts}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
                    ListHeaderComponent={category.name === 'Cây trồng' ? renderHeader() : null}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <ProductItem item={item} onPress={() => navigation.navigate('ProductDetail', {product: item})}/>
                    )}
                />
            </View>
        </View>
    )
}

export default ProductByCateScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
    },
    menuItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    menuItemSelected: {
        alignItems: 'center',
        backgroundColor: '#009245',
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    menuText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#7D7B7B',

    },
    selectedMenuText: {
        fontSize: 14,
        fontWeight: '400',
        color: 'white',
    },
})