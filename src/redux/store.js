import createSagaMiddleware from 'redux-saga';
import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import { rootSaga } from './sagas';
import appReducers from './reducers/index';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: hardSet,
    blacklist: ['searchReducer'],
}

const persistedReducer = persistReducer(persistConfig, appReducers)

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);
const enhancer = compose(middleware);

export const store = createStore(persistedReducer, enhancer)
export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga);