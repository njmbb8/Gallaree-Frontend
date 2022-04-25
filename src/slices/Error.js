import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'error',
    initialState: '',
    reducers: {
        setError: (state, action) => {
            return action.payload
        }
    }
})

export const { setError } = slice.actions
export default slice.reducer