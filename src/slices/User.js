import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        authenticate: (state, action) => {
            state.user = action.payload
        },
        signOut: state => {
            state.user = {}
        }
    }
})

export const { authenticate, signOut } = slice.actions
export default slice.reducer