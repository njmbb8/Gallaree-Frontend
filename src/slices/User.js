import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        authenticate: (state, action) => {
            return action.payload
        },
        signOut: state => {
            return {}
        }
    }
})

const { authenticate, signOut } = slice.actions

export { authenticate, signOut }
export default slice.reducer