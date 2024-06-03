import { createAsyncThunk } from "@reduxjs/toolkit";
import { Ezer } from "../../http/Ezer";
import AsyncStorage from "@react-native-async-storage/async-storage";



/**
 * @description: Make POST request to login, grab the token and set it in the 
 * async storage. Return the token to the application
 * 
 * @returns: user instance and the token in one call.
 */
export const login = createAsyncThunk(
    "auth/login", 
    async ({username, password},{rejectWithValue, getState})=> {
        try {
            const response = await Ezer.post("/auth",
                {username, password},
                {params:{authType:'login'}}
            );
            const token = response.data.data;

            // Set the jwt token
            await AsyncStorage.setItem("TOKEN", token);
            // Now grab the user
            const userResponse = await Ezer.post('/auth',{},{params:{authType:"getme"}});
            const user = userResponse.data.data

            return {token, user};

        } catch(error) {
            return rejectWithValue(error.response.status);
        }
    }
);



/**
 * @description: Makes API call get get the currently logged in user. This requires
 * a valid JWT token otherwise this will default into an error
 * 
 * @returns User object.
 */
export const getMe = createAsyncThunk(
    "auth/getMe",
    async (_,{rejectWithValue, getState})=> {
        try {
            const getMeResponse = await Ezer.post('/auth',{},{params:{authType: "getme"}});
            const user = getMeResponse.data.data;
            console.log('get me user: ', user);
            return user;
        } catch(error) {
            return rejectWithValue(error.response.status);
        }
    }
)

