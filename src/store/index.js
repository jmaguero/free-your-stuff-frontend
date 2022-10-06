import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import productReducer from "./product/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    product: productReducer
  },
});