import React, { useEffect, useState, useRef } from "react";
import {
    Keyboard, StyleSheet, TextInput,
    TouchableWithoutFeedback, View, Animated, TouchableOpacity, ActivityIndicator, Text
} from 'react-native';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Entypo';

import { types } from "../action/actionType";
import Card from '../component/card';
import Loader from "../component/loader";
import { dynamicSize, getFontSize } from "../utils/responsive";

const SearchScreen = (props) => {

    const { navigation } = props;
    const dispatch = useDispatch();
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scrollYValue, setScrollYValue] = useState(new Animated.Value(0));
    const inputRef = useRef();
    const [crossVisible, setCrossVisible] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [reachEnd, setReachEnd] = useState(true);
    const [searchKey, setSearchKey] = useState('');
    const [moreLoading, setMoreLoading] = useState(false);

    const { searchDataList, isLoading, isKeyBoardOpen, isMoreLoading } = useSelector((state) => ({
        searchDataList: state?.searchReducer?.searchData,
        isLoading: state?.searchReducer?.isLoading,
        isKeyBoardOpen: state?.searchReducer?.isKeyBoardOpen,
        isMoreLoading: state?.searchReducer?.moreLoading
    }), shallowEqual);

    useEffect(() => {
        if (searchDataList && searchDataList.length > 0) {
            Keyboard.dismiss();
            setSearchData(searchDataList);
        }
    }, [searchDataList])


    useEffect(() => {
        setMoreLoading(isMoreLoading);
    }, [isMoreLoading])

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading])

    useEffect(() => {
        if (isKeyBoardOpen) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 300)
        }
        return () => {
            dispatch({
                type: types.IS_KEYBOARD_OPEN,
                payload: false
            });
        }
    }, [isKeyBoardOpen])

    useEffect(() => {
        if (pageNumber > 0 && searchKey != '') {
            dispatch({ type: types.IS_MORE_LOADING, payload: true });
            dispatch({ type: types.LOAD_MORE_BOOK, payload: { value: searchKey, pageNumber: pageNumber } });
        }
    }, [pageNumber])

    const onChangeText = (value) => {
        if (value != '') {
            setCrossVisible(true);
            setSearchKey(value);
            dispatch({ type: types.IS_LOADING, payload: true });
            dispatch({ type: types.SEARCH_BOOK, payload: value });
        } else {
            setCrossVisible(false);
        }
    }
    const clampedScroll = Animated.diffClamp(
        Animated.add(
            scrollYValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
            }),
            new Animated.Value(0),
        ),
        0,
        50,
    )

    const searchBarTranslate = clampedScroll.interpolate({
        inputRange: [0, 50],
        outputRange: [0, -(250)],
        extrapolate: 'clamp',
    });
    const searchBarOpacity = clampedScroll.interpolate({
        inputRange: [0, 10],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const clearInput = () => {
        setCrossVisible(false);
        inputRef.current.clear();
        setSearchData([]);
        setPageNumber(0);
        setSearchKey('');
        dispatch({
            type: types.CLEAR_SEARCH_HISTORY,
            payload: []
        });
    }

    const fetchMoreBooks = () => {
        if (!reachEnd && searchKey != '') {
            setPageNumber(pageNumber + 1);
            setReachEnd(true)
        }
    }

    return (
        <TouchableWithoutFeedback onPressIn={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Animated.View
                    style={[
                        styles.searchInputContainer,
                        {
                            transform: [
                                {
                                    translateY: searchBarTranslate
                                }
                            ],
                            opacity: searchBarOpacity,
                        }
                    ]}>
                    <View style={styles.inputStyleContainer}>
                        <TextInput
                            keyboardType='web-search'
                            inputMode='search'
                            ref={inputRef}
                            style={styles.inputStyle}
                            placeholder="Search Here"
                            onChangeText={onChangeText}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        />
                        {crossVisible ? (
                            <TouchableOpacity style={styles.crossButton} onPress={clearInput}>
                                <Icon name={'circle-with-cross'} size={dynamicSize(20)} color="#900" />
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </Animated.View>
                <Loader isVisible={loading} />
                <View style={styles.listContainer}>
                    <Animated.FlatList
                        showsVerticalScrollIndicator={false}
                        data={searchData}
                        keyExtractor={(item, index) => index?.toString()}
                        renderItem={({ item, index }) => <Card key={index} data={item} fromWhere={'search'} navigation={navigation} />}
                        ListEmptyComponent={() => {
                            if (loading) return null;
                            return (
                                <View style={styles.emptyContainer}>
                                    <Lottie source={require('../assets/search_illustrator.json')} autoPlay loop />
                                </View>
                            )
                        }}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
                            { useNativeDriver: true }
                        )}
                        onEndReachedThreshold={0.2}
                        onEndReached={fetchMoreBooks}
                        onMomentumScrollBegin={() => setReachEnd(false)}
                        ListFooterComponent={() => {
                            if (moreLoading || loading) return null;
                            return (
                                <View style={styles.loadMoreContainer}>
                                    <ActivityIndicator size={'small'} color={'green'} />
                                    <Text style={styles.loadMoreText}>Loading More...</Text>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
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
    },
    searchInputContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: dynamicSize(20)
    },
    inputStyleContainer: {
        flexDirection: 'row',
        width: dynamicSize(340),
        height: dynamicSize(45),
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 20,
        fontSize: getFontSize(14),
        color: '#000',
        fontWeight: '500'
    },
    inputStyle: {
        width: dynamicSize(340),
        height: dynamicSize(45),
        paddingHorizontal: dynamicSize(20),
        fontSize: getFontSize(14),
        color: '#000',
        fontWeight: '500'
    },
    emptyContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: dynamicSize(300),
        height: dynamicSize(500),
        alignContent: 'center',
        alignItems: 'center'
    },
    crossButton: {
        position: 'absolute',
        zIndex: 2000,
        right: dynamicSize(10),
        top: dynamicSize(10)
    },
    loadMoreText: {
        color: 'green',
        fontSize: getFontSize(12),
        fontWeight: '600'
    },
    loadMoreContainer: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: dynamicSize(30),
        marginTop: dynamicSize(20),
        alignContent: 'center',
        alignItems: 'center'
    }
});

export default SearchScreen;