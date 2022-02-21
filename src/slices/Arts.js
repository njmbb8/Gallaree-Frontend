import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'arts',
    initialState: [],
    reducers: {
        populate: ( state, action ) => {
            state.arts = action.payload
        },
        addNew: ( state, action ) => {
            state.arts = [ ...state.arts, action.payload ]
        },
        remove: ( state, action ) => {
            state.arts = state.arts.filter((art) => {
                art.id !== action.payload.id
            })
        }
    }
})

const { populate, addNew } = slice.actions

export { populate, addNew }
export default slice.reducer