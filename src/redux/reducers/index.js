import { combineReducers } from "redux";

import searchReducer from "./searchReducer";
import favoriteReducer from "./favoriteReducer";

const appReducers = combineReducers({
    searchReducer,
    favoriteReducer
});

export default appReducers;