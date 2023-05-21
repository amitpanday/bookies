import { call, delay, takeLatest } from 'redux-saga/effects'

import { types } from '../../action/actionType';
import { apiCall } from '../../services/apicall';
import { serviceUrl } from '../../services/serviceurl';
import { store } from '../store';

function* searchBookByName({ payload }) {
    try {
        yield delay(800);
        const url = serviceUrl.bookSearchUrl + '?q=' + payload + '&startIndex=0';
        let response = yield call(apiCall, url, {}, 'get');
        let { status, result } = response;
        if (status) {
            store.dispatch({
                type: types.SEARCH_BOOK_SUCCESS,
                payload: result.items
            });
            store.dispatch({ type: types.IS_LOADING, payload: false });
        }
    } catch (error) {
        console.log("🚀 ~ file: searchSaga.js:9 ~ function*searchBookByName ~ error:", error)
    }
}

function* loadMoreBook({ payload }) {
    const { pageNumber, value } = payload;
    try {
        const url = serviceUrl.bookSearchUrl + '?q=' + value + `&startIndex=${pageNumber}`;
        let response = yield call(apiCall, url, {}, 'get');
        let { status, result } = response;
        if (status) {
            store.dispatch({
                type: types.SEARCH_BOOK_SUCCESS,
                payload: result.items
            });
            store.dispatch({ type: types.IS_MORE_LOADING, payload: false });
        }
    } catch (error) {
        console.log("🚀 ~ file: searchSaga.js:9 ~ function*searchBookByName ~ error:", error)
    }
}

export function* watchSearchSaga() {
    yield takeLatest(types.SEARCH_BOOK, searchBookByName);
    yield takeLatest(types.LOAD_MORE_BOOK, loadMoreBook);
};