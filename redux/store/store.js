import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import friendsReducer from "../slice/friendsSlice";
import dataReducer from '../slice/dataSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        friends:friendsReducer,
        data: dataReducer
    }
});