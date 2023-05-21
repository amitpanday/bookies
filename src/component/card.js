import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native';
import { useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { dynamicSize, getFontSize } from "../utils/responsive";
import { types } from "../action/actionType";

const Card = ({ data, fromWhere, navigation }) => {
    const dispatch = useDispatch();
    const { volumeInfo, id } = data;
    const authors = volumeInfo?.authors ? volumeInfo?.authors : [];
    const addToFavorite = (item) => {
        ToastAndroid.showWithGravity(
            'Added to favorite',
            ToastAndroid.CENTER,
            ToastAndroid.SHORT
        );
        dispatch({
            type: types.ADD_TO_FAVORITE,
            payload: item
        });
    }
    const iconName = fromWhere == 'favorite' ? 'favorite' : 'favorite-outline';
    const removeToFavorite = (bookId) => {
        ToastAndroid.showWithGravity(
            'Removed from favorite',
            ToastAndroid.CENTER,
            ToastAndroid.SHORT
        );
        dispatch({
            type: types.REMOVE_TO_FAVORITE,
            payload: bookId
        });
    }

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('BookDetails', { bookDetails: data, fromWhere })}
            style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity
                    style={styles.favIcon}
                    onPress={() => {
                        if (fromWhere == 'favorite') {
                            removeToFavorite(id)
                        } else {
                            addToFavorite(data)
                        }
                    }}
                >
                    <Icon name={iconName} size={dynamicSize(25)} color="#900" />
                </TouchableOpacity>
                <View style={styles.bookImageContainer}>
                    <Image
                        resizeMode='contain'
                        style={{ width: dynamicSize(80), height: dynamicSize(80) }}
                        source={{ uri: volumeInfo?.imageLinks?.smallThumbnail }} />
                </View>
                <View style={{ flex: 0.8, paddingLeft: dynamicSize(20), justifyContent: 'center' }}>
                    <Text numberOfLines={3} style={styles.tittleText}>{volumeInfo?.title}</Text>
                    <View style={{ paddingTop: dynamicSize(5), flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={styles.authorsHeading}>Authors:</Text>
                        {authors.map((item, index) => {
                            return (
                                <Text
                                    style={{ ...styles.authorsHeading, fontWeight: '500', color: 'red', marginLeft: 2 }}
                                    numberOfLines={1} key={index}>{item.toString()}</Text>
                            )
                        })}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: dynamicSize(340),
        height: dynamicSize(100),
        backgroundColor: '#fff',
        marginVertical: dynamicSize(10),
        borderRadius: 15
    },
    bookImageContainer: {
        flex: 0.2,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    tittleText: {
        color: '#000',
        fontWeight: '700',
        fontSize: getFontSize(14)
    },
    authorsHeading: {
        color: '#000',
        fontWeight: '600',
        fontSize: getFontSize(12)
    },
    favIcon: {
        position: 'absolute',
        zIndex: 100,
        right: dynamicSize(4),
        top: dynamicSize(3)
    }
});

export default Card;