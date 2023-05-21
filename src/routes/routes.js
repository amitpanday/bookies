import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, Text, View } from "react-native";

import SearchScreen from '../screen/searchScreen';
import Favorite from "../screen/favorite";
import BookDetails from "../screen/bookdetails";
import { dynamicSize, getFontSize } from "../utils/responsive";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    activeLabel: {
        color: '#900',
        fontSize: getFontSize(12),
        fontWeight: '700'
    },
    inActiveLabel: {
        color: 'green',
        fontSize: getFontSize(10),
        fontWeight: '500'
    }
});

const BottomTabNavigator = (props) => {
    return (
        <Tab.Navigator
            initialRouteName={'SearchScreen'}
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopWidth: 0,
                    height: dynamicSize(55),
                    backgroundColor: 'white',
                }
            }}>
            <Tab.Screen
                name={'SearchScreen'}
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ focused, size, color }) => {
                        if (focused) {
                            return (
                                <View style={styles.container}>
                                    <Icon name="search" size={dynamicSize(30)} color="#900" />
                                    <Text style={styles.activeLabel}>Search</Text>
                                </View>
                            )
                        } else {
                            return (
                                <View style={styles.container}>
                                    <Icon name="search" size={dynamicSize(25)} color="green" />
                                    <Text style={styles.inActiveLabel}>Search</Text>
                                </View>
                            )
                        }
                    }
                }}
            />
            <Tab.Screen
                name={'Favorite'}
                component={Favorite}
                options={{
                    tabBarLabel: 'Favorite',
                    tabBarIcon: ({ focused, size, color }) => {
                        if (focused) {
                            return (
                                <View style={styles.container}>
                                    <Icon name="favorite" size={dynamicSize(30)} color="#900" />
                                    <Text style={styles.activeLabel}>Favorite</Text>
                                </View>
                            )
                        } else {
                            return (
                                <View style={styles.container}>
                                    <Icon name="favorite-outline" size={dynamicSize(25)} color="green" />
                                    <Text style={styles.inActiveLabel}>Favorite</Text>
                                </View>
                            )
                        }
                    }
                }}
            />
        </Tab.Navigator>
    )

}

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="TabScreen"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name={'TabScreen'} component={BottomTabNavigator} />
                <Stack.Screen name="BookDetails" component={BookDetails} options={{ headerShown: true }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;