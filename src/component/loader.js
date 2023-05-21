import React from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import Lottie from 'lottie-react-native';

import { dynamicSize, getFontSize } from "../utils/responsive";


const Loader = ({ isVisible }) => {
    if (!isVisible) return null;
    return (
        <View style={styles.container}>
            <View style={styles.boxStyle}>
                <Lottie source={require('../assets/searching_icon.json')} loop autoPlay />
                <View style={{ flex: 1 }}>
                    <Text style={styles.loadingText}>Searching</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    boxStyle: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: dynamicSize(120),
        height: dynamicSize(65),
        borderRadius: 10
    },
    loadingText: {
        color: 'green',
        fontSize: getFontSize(12),
        fontWeight: '400'
    }
});

export default Loader;