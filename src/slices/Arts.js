import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'arts',
    initialState: [],
    reducers: {
        populate: ( state, action ) => {
            return action.payload
        },
        addNew: ( state, action ) => {
            return [ ...state.arts, action.payload ]
        },
        remove: ( state, action ) => {
            return state.arts.filter((art) => art.id !== action.payload.id)
        },
        update: ( state, action ) => {
            return state.arts.map((art) => {
                if(art.id === action.payload.id){
                    art = action.payload
                }
            })
        }
    }
})

const { populate, addNew, remove, update } = slice.actions

export { populate, addNew, remove, update }
export default slice.reducer