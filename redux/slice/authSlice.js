import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: null,
    pushToken: null,


    user: null,

};




const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signOut: (state, {payload})=> {
            state.token = null;
        },
        setToken: (state, {payload})=> {
            state.token = payload;
        },
        setPushToken: (state, {payload})=> {
            state.pushToken = payload;
        },
    },
    extraReducers: (builder)=> {

    }
})