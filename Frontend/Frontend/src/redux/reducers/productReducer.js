import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        listProduct: []
    },
    reducers: {
        addProducts(state, action) {
            state.listProduct = [...state.listProduct, ...action.payload]
        }
    }
})

export const { addProducts } = productSlice.actions;
export default productSlice.reducer;