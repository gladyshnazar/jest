// src/reducers/index.ts
import { combineReducers } from "redux";
import collectionsReducer from "./collections/reducer";
import modalReducer from "./modal/reducer";
import shopReducer from "./shop/reducer";
import searchReducer from "./search/reducer";
import userReducer from "./user/reducer";

const rootReducer = combineReducers({
  modal: modalReducer,
  collections: collectionsReducer,
  shop: shopReducer,
  search: searchReducer,
  user: userReducer,
});

export default rootReducer;
