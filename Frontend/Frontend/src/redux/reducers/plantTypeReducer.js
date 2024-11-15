import { createSlice } from "@reduxjs/toolkit";

const plantTypeSlice = createSlice({
    name: 'plantType',
    initialState: {
        listPlantType: []
    },
    reducers: {
        addPlantTypes(state, action) {
            state.listPlantType = [...state.listPlantType, ...action.payload]
        }
    }
})

export const { addPlantTypes } = plantTypeSlice.actions;
export default plantTypeSlice.reducer;