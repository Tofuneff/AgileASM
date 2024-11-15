import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        listCategory: []
    },
    reducers: {
        addCategories(state, action) {
            state.listCategory = [...state.listCategory, ...action.payload]
        }
    }
})

export const { addCategories } = categorySlice.actions;
export default categorySlice.reducer;