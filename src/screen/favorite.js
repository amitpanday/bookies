import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Lottie from 'lottie-react-native';

import { dynamicSize, getFontSize } from "../utils/responsive";
import Card from '../component/card';
import { types } from "../action/actionType";

const Favorite = (props) => {

    const dispatch = useDispatch();
    const { navigation } = props;
    const [favoriteData, setFavoriteData] = useState([]);

    const { favoriteDataList } = useSelector((state) => ({
        favoriteDataList: state?.favoriteReducer?.favoriteData
    }), shallowEqual);
    useEffect(() => {
        setFavoriteData(favoriteDataList);
    }, [favoriteDataList])

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={favoriteData}
                    keyExtractor={(item, index) => index?.toString()}
                    renderItem={({ item, index }) => <Card key={index} data={item} fromWhere={'favorite'} navigation={navigation} />}
                    ListEmptyComponent={() => {
                        return (
                            <View style={styles.emptyContainer}>
                                <Lottie source={require('../assets/Bookmark_icon.json')} autoPlay loop />
                                <View style={styles.textButtonContainer}>
                                    <Text style={styles.textStyle}>{`You don't have any favorite books yet,\n Let's change it`}</Text>
                                    <TouchableOpacity
                                        style={styles.buttonStyle}
                                        onPress={() => {
                                            dispatch({
                                                type: types.IS_KEYBOARD_OPEN,
                                                payload: true
                                            });
                                            navigation.navigate('SearchScreen')
                                        }}
                                    >
                                        <Text style={{ ...styles.textStyle, color: '#fff', fontWeight: '700' }}>Lets Search</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    listContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: dynamicSize(20)
    },
    emptyContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: dynamicSize(300),
        height: dynamicSize(500),
        alignContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: getFontSize(12),
        color: '#000',
        fontWeight: '600',
        textAlign: 'center'
    },
    buttonStyle: {
        width: dynamicSize(120),
        height: dynamicSize(40),
        backgroundColor: 'green',
        borderRadius: 20,
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: dynamicSize(20)
    },
    textButtonContainer: {
        height: dynamicSize(350),
        width: dynamicSize(250),
        justifyContent: 'flex-end',
        alignContent: 'center',
        alignItems: 'center'
    }
});

export default Favorite;