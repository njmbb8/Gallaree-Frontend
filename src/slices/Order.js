import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'order',
    initialState: [],
    reducers: {
        updateOrderItems: (state, action) => {
            return action.payload
        }
    }
})

export const {updateOrderItems} = slice.actions
export default slice.reducer