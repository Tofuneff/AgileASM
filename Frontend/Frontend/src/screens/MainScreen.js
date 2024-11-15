import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen'
import SearchScreen from './SearchScreen'
import NotiScreen from './NotiScreen'
import ProfileScreen from './ProfileScreen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../AppContants'

const Tab = createBottomTabNavigator()

const MainScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName

                        if (route.name === 'Home') {
                            iconName = require('../assets/ic_home.png');
                        } else if (route.name === 'Search') {
                            iconName = require('../assets/ic_search.png');
                        } else if (route.name === 'Noti') {
                            iconName = require('../assets/ic_noti.png');
                        } else if (route.name === 'Profile') {
                            iconName = require('../assets/ic_profile.png');
                        }

                        return (
                            <View style={{ alignItems: 'center' }}>
                                <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />
                                <View style={{ height: 5, width: 5, backgroundColor: focused ? 'black' : 'transparent', borderRadius: 2.5, marginTop: 3 }} />
                            </View>
                        )
                    },
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'black',
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: COLORS.backgroundColor,
                        elevation: 0,
                        shadowOpacity: 0,
                        borderTopWidth: 0,
                        height: 60
                    }
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Search" component={SearchScreen} />
                <Tab.Screen name="Noti" component={NotiScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    )
}

export default MainScreen

const styles = StyleSheet.create({})