import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        listCart: []
    },
    reducers: {
        addCarts(state, action) {
            state.listCart = [...state.listCart, ...action.payload]
        },

        addCart(state, action) {
            state.listCart.push(action.payload)
        },

        updateCart(state, action) {
            const index = state.listCart.findIndex(cart => cart.product._id === action.payload.product._id);
            if (index !== -1) {
                state.listCart[index] = action.payload;
            }
        },

        increaseQuantity(state, action) {
            const index = state.listCart.findIndex(cart => cart.product._id === action.payload.product._id);
            if (index !== -1) {
                state.listCart[index].quantity++;
            }
        },

        decreaseQuantity(state, action) {
            const index = state.listCart.findIndex(cart => cart.product._id === action.payload.product._id);
            if (index !== -1) {
                state.listCart[index].quantity--;
            }
        }
    }
})

export const { addCarts, addCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;