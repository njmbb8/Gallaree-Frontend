import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'arts',
    initialState: {},
    reducers: {
        populate: ( state, action ) => {
            state.arts = action.payload
        }
    }
})

const { populate } = slice.actions

export { populate }
export default slice.reducer