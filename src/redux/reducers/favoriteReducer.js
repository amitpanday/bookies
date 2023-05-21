import { types } from "../../action/actionType";

const INITIAL_STATE = {
    favoriteData: []
};

export default (state = INITIAL_STATE, { payload, type }) => {

    switch (type) {
        case types.ADD_TO_FAVORITE:
            let favoriteData = [payload, ...state?.favoriteData];
            return { ...state, favoriteData }
        case types.REMOVE_TO_FAVORITE:
            let allFavoriteData = [...state?.favoriteData]?.filter((item) => item.id != payload);
            return { ...state, favoriteData: allFavoriteData }
        default:
            return state;
    }
}