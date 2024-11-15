import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducers/productReducer";
import categoryReducer from "../reducers/categoryReducer";
import plantTypeReducer from "../reducers/plantTypeReducer";
import cartReducer from "../reducers/cartReducer";

export default configureStore({
    reducer: {
        listProductStore: productReducer,
        listCategoryStore: categoryReducer,
        listPlantTypeStore: plantTypeReducer,
        listCartStore: cartReducer
    }
})