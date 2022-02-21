import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        user: slice.reducer
    }
})

export default store