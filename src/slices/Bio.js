import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'bio',
    initialState: {},
    reducers: {
        setBioInfo: (state, action) => {
            return action.payload
        }
    }
})

export const {setBioInfo} = slice.actions
export default slice.reducer