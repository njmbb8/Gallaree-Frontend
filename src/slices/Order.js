import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'order',
    initialState: [],
    reducers: {
        getOrderItems: (state, action) => {
            return action.payload
        },
        addItemToOrder: ( state, action) => {
            return [...state, action.payload]
        },
        removeItem: ( state, action ) => {
            return state.filter((orderItem) => {
                return orderItem.id !== action.payload.id
            })
        }
    }
})

export const {getOrderItems, addItemToOrder, removeItem} = slice.actions
export default slice.reducer