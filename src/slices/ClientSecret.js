import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'clientSecret',
    initialState: '',
    reducers: {
        setClientSecret: (state, action) => {
            return action.payload
        }
    }
})

export const { setClientSecret } = slice.actions
export default slice.reducer