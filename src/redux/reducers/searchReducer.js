import { types } from "../../action/actionType";

const INITIAL_STATE = {
    searchData: [],
    isLoading: false,
    isKeyBoardOpen: false,
    moreLoading: false
};

export default (state = INITIAL_STATE, { payload, type }) => {

    switch (type) {
        case types.SEARCH_BOOK_SUCCESS:
            return { ...state, searchData: [...state.searchData, ...payload] }
        case types.IS_LOADING:
            return { ...state, isLoading: payload }
        case types.IS_KEYBOARD_OPEN:
            return { ...state, isKeyBoardOpen: payload }
        case types.IS_MORE_LOADING:
            return { ...state, moreLoading: payload }
        case types.CLEAR_SEARCH_HISTORY:
            return { ...state, searchData: payload }
        default:
            return state;
    }
}