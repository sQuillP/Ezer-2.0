import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    capturedPhoto: null,
};


const dataSlice = createSlice({
    name:"data",
    initialState,
    reducers: {
        setPhoto: (state, {payload})=> {
            state.capturedPhoto = payload;
        }
    }
});


export const { setPhoto, } = dataSlice.actions;
export default dataSlice.reducer;