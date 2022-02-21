import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/User"
import artsReducer from "./slices/Arts"

const store = configureStore({
    reducer: {
        arts: artsReducer,
        user: userReducer
    }
})

export default store