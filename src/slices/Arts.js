import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'arts',
    initialState: [],
    reducers: {
        populate: ( state, action ) => {
            return action.payload
        },
        addNew: ( state, action ) => {
            return [ ...state, action.payload ]
        },
        remove: ( state, action ) => {
            return state.filter((art) => {
                return art.id !== action.payload.id
            })
        },
        update: ( state, action ) => {
            return state.map((art) => {
                if(art.id === action.payload.id){
                    return art = action.payload
                }
                else{
                    return art
                }
            })
        }
    }
})

const { populate, addNew, remove, update } = slice.actions

export { populate, addNew, remove, update }
export default slice.reducer