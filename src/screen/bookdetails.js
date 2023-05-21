import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { dynamicSize, getFontSize } from "../utils/responsive";
import { types } from "../action/actionType";

const BookDetails = (props) => {

    const dispatch = useDispatch();
    const { navigation, route } = props;
    const { bookDetails, fromWhere } = route?.params;
    const authors = bookDetails?.volumeInfo?.authors ? bookDetails?.volumeInfo?.authors : [];
    const categories = bookDetails?.volumeInfo?.categories ? bookDetails?.volumeInfo?.categories : [];
    const iconName = fromWhere == 'favorite' ? 'favorite' : 'favorite-outline';

    const addToFavorite = (item) => {
        dispatch({
            type: types.ADD_TO_FAVORITE,
            payload: item
        });
    }
    const removeToFavorite = (bookId) => {
        dispatch({
            type: types.REMOVE_TO_FAVORITE,
            payload: bookId
        });
    }
    
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.favIcon}
                onPress={() => {
                    if (fromWhere == 'favorite') {
                        removeToFavorite(bookDetails?.id)
                    } else {
                        addToFavorite(bookDetails)
                    }
                }}
            >
                <Icon name={iconName} size={dynamicSize(25)} color="#900" />
            </TouchableOpacity>
            <View style={styles.bookImageContainer}>
                <View style={{ flex: 0.3, paddingLeft: dynamicSize(10) }}>
                    <Image
                        resizeMode='contain'
                        style={{ width: dynamicSize(100), height: dynamicSize(150) }}
                        source={{ uri: bookDetails?.volumeInfo?.imageLinks?.thumbnail }} />
                    <Text style={{ ...styles.authorsHeading, paddingTop: dynamicSize(5) }}>
                        {bookDetails?.volumeInfo?.pageCount} Pages</Text>
                </View>
                <View style={{ flex: 0.7 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ paddingBottom: dynamicSize(20) }}>
                        <Text style={{...styles.authorsHeading, fontWeight:'700', fontSize:getFontSize(16)}}>{bookDetails?.volumeInfo?.title}</Text>
                            <View style={{ paddingTop: dynamicSize(5), flexDirection: 'row', flexWrap: 'wrap' }}>
                                <Text style={styles.authorsHeading}>Authors:</Text>
                                {authors.map((item, index) => {
                                    return (
                                        <Text style={{ ...styles.authorsHeading, fontWeight: '500', color: 'red', marginLeft: 2 }} key={index}>
                                            {item.toString()}
                                        </Text>
                                    )
                                })}
                            </View>
                            <View style={{ paddingTop: dynamicSize(5), flexDirection: 'row', flexWrap: 'wrap' }}>
                                <Text style={styles.authorsHeading}>Publisher:</Text>
                                <Text style={{ ...styles.authorsHeading, fontWeight: '500', color: 'red', marginLeft: 2 }}>
                                    {bookDetails?.volumeInfo?.publisher}
                                </Text>
                            </View>
                            <View style={{ paddingTop: dynamicSize(5), flexDirection: 'row', flexWrap: 'wrap' }}>
                                <Text style={styles.authorsHeading}>PublishedDate:</Text>
                                <Text style={{ ...styles.authorsHeading, fontWeight: '500', color: 'red', marginLeft: 2 }}>
                                    {bookDetails?.volumeInfo?.publishedDate}
                                </Text>
                            </View>
                            <View style={{ paddingTop: dynamicSize(5), flexDirection: 'row', flexWrap: 'wrap' }}>
                                <Text style={styles.authorsHeading}>Categories:</Text>
                                <Text style={{ ...styles.authorsHeading, fontWeight: '500', color: 'red', marginLeft: 2 }}>
                                    {categories.map((item, index) => {
                                        return (
                                            <Text style={{ ...styles.authorsHeading, fontWeight: '500', color: 'red', marginLeft: 2 }} key={index}>
                                                {item.toString()}
                                            </Text>
                                        )
                                    })}
                                </Text>
                            </View>
                            <View style={{ paddingTop: dynamicSize(5), }}>
                                <Text style={styles.authorsHeading}>Description:</Text>
                                <Text style={{ ...styles.authorsHeading, fontWeight: '500', color: '#000' }}>
                                    {bookDetails?.volumeInfo?.description}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    bookImageContainer: {
        flex: 1,
        // justifyContent: 'center',
        // alignContent: 'center',
        // alignItems: 'center',
        marginTop: dynamicSize(8),
        flexDirection: 'row'
    },
    favIcon: {
        position: 'absolute',
        zIndex: 100,
        right: dynamicSize(4),
        top: dynamicSize(3)
    },
    authorsHeading: {
        color: '#000',
        fontWeight: '600',
        fontSize: getFontSize(12)
    },
});

export default BookDetails;