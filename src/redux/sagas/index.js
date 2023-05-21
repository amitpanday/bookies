import { all, fork } from 'redux-saga/effects';

import { watchSearchSaga } from './searchSaga';

export function* rootSaga() {
    yield all([
        fork(watchSearchSaga),
    ]);
}