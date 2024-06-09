import { createSlice } from "@reduxjs/toolkit";
import { getMe, login, signup } from "../thunk/authThunk";
const initialState = {
    token: null,
    pushToken: null,
    user: null,

    //Login state, mostly for UI purposes.
    loginPending: false,
    invalidLoginCredentials: false,

    signupPending: false,


    internalServerError: false
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signOut: (state, {payload})=> {
            state.token = null;
            state.user = null;
            
        },
        setToken: (state, {payload})=> {
            state.token = payload;
        },
        setPushToken: (state, {payload})=> {
            state.pushToken = payload;
        },
        setUser: (state, {payload})=> {
            state.user = payload;
        }
    },
    extraReducers: (builder)=> {

        //Extract the user and the token from login being fulfilled.
        builder.addCase(login.fulfilled, (state, {payload})=> {
            state.user = payload.user;
            state.token = payload.token;
            state.loginPending = false;
        });

        builder.addCase(login.pending, (state, _)=> {
            state.loginPending = true;
        });

        builder.addCase(login.rejected, (state, {payload})=> {
            state.loginPending = false;
            if(payload === 404 || payload === 400 || payload=== 401){
                state.invalidLoginCredentials = true;
            } else {
                state.internalServerError = true;
            }
        });

        builder.addCase(signup.fulfilled, (state, {payload})=> {
            console.log("INCOMING PAYLOAD:::", payload);
            state.user = payload.newUser;
            state.token = payload.token;
            state.signupPending = false;
        });

        builder.addCase(signup.pending, (state, {payload})=> {
            state.signupPending = true;
        });

        builder.addCase(signup.rejected, (state, {payload})=> {
            state.signupPending = false;
        })

        builder.addCase(getMe.fulfilled, (state, {payload})=> {
            state.user = payload;
            state.loginPending = false;

        });

        builder.addCase(getMe.rejected, (state, {payload})=> {
            state.loginPending = false;
            state.internalServerError = true;
        });

        builder.addCase(getMe.pending, (state, _)=> {
            state.loginPending = true;
        });

    }
});


export const { signOut, setPushToken, setToken, setUser } = authSlice.actions;

export default authSlice.reducer;