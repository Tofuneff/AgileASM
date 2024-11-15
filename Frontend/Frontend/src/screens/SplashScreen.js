import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DataManager from '../utils/DataManager';
import { API_URL, COLORS } from '../AppContants';
import { useDispatch, useSelector } from 'react-redux';
import { addCategories } from '../redux/reducers/categoryReducer';
import { addProducts } from '../redux/reducers/productReducer';
import { addPlantTypes } from '../redux/reducers/plantTypeReducer';
import { addCarts } from '../redux/reducers/cartReducer';


const SplashScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [initialTimeout, setInitialTimeout] = useState(true);
    const [loadingText, setLoadingText] = useState('Loading...');

    const dispatch = useDispatch()

    useEffect(() => {
        const intervalId = setInterval(() => {
            setLoadingText(prev => {
                switch (prev) {
                    case 'Loading':
                        return 'Loading.';
                    case 'Loading.':
                        return 'Loading..';
                    case 'Loading..':
                        return 'Loading...';
                    default:
                        return 'Loading';
                }
            });
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchApiData = async () => {
            try {
                await loadCategories()
                await loadProducts()
                await loadPlantTypes()
                
                navigation.replace('Login');
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            setInitialTimeout(false);
            setLoading(true);
            fetchApiData();
        }, 2000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [navigation]);

    const loadCategories = async () => {
        try {
            const res = await fetch(`${API_URL}/categories/get-categories`);
            const categories = await res.json();
            dispatch(addCategories(categories));
            
            // DataManager.shared.setCategories(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    const loadProducts = async () => {
        try {
            const res = await fetch(`${API_URL}/products/get-products`);
            const products = await res.json();
            dispatch(addProducts(products))

            // DataManager.shared.setProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const loadPlantTypes = async () => {
        try {
            const res = await fetch(`${API_URL}/plantTypes/get-plant-types`);
            const plantTypes = await res.json();
            dispatch(addPlantTypes(plantTypes))

            // DataManager.shared.setPlantTypes(plantTypes);
        } catch (error) {
            console.error('Error fetching plant types:', error);
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} resizeMode='contain' style={styles.logo} />
            <Text style={styles.text}>Mã sinh viên: PH47395</Text>
            <Text style={styles.text}>Họ và tên: Hồ Hữu Nhân</Text>
            {!initialTimeout && loading && (
                <View >
                    <Text style={styles.text}>{loadingText}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: COLORS.textColor,
        fontSize: 16,
        fontWeight: 'bold'
    },
    logo: {
        width: '50%',
        height: undefined,
        aspectRatio: 1,
    },
})

export default SplashScreen

