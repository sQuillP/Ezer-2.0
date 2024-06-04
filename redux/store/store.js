import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import friendsReducer from "../slice/friendsSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        friends:friendsReducer
    }
});