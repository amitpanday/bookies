import React from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

import AppNavigation from "./src/routes/routes";
import { store, persistor } from "./src/redux/store";

const App = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Provider store={store}>
                <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
                    <StatusBar barStyle='dark-content' />
                    <AppNavigation />
                </PersistGate>
            </Provider>
        </SafeAreaView>
    )
}

export default App;