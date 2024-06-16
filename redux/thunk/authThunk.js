import { createAsyncThunk } from "@reduxjs/toolkit";
import { Ezer } from "../../http/Ezer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRelations } from "./friendsThunk";
import { uploadImageToS3 } from "../../http/s3/s3";
import { setPhoto } from "../slice/dataSlice";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import getNotificationCredentials from "../../global-components/notifications/getNotificationCredentials";

import { setToken } from "../slice/authSlice";

// TODO: Please work on Notification credentials...



/**
 * @description: Make POST request to login, grab the token and set it in the 
 * async storage. Return the token to the application
 * 
 * @returns: user instance and the token in one call.
 */
export const login = createAsyncThunk(
    "auth/login", 
    async ({username, password},{rejectWithValue, getState, dispatch})=> {
        try {
            //Grab notification credentials
            const notificationCredentails = await getNotificationCredentials();
            const response = await Ezer.post("/auth",
                {username, password, ...notificationCredentails},
                {params:{authType:'login'}}
            );
            const token = response.data.data;

            // Set the jwt token
            await AsyncStorage.setItem("TOKEN", token);
            // Now grab the user
            const userResponse = await Ezer.post('/auth',{},{params:{authType:"getme"}});
            const user = userResponse.data.data;
            //Load the relations data while we're at it.
            await dispatch(getRelations());
            return {token, user};

        } catch(error) {
            return rejectWithValue(error.response.status);
        }
    }
);


export const signup = createAsyncThunk(
    "auth/signup",
    async ({signupForm}, {rejectWithValue, getState, dispatch})=> {
        try {
            const {capturedPhoto} = getState().data;

            //get notification status
            const notificationCredentails = await getNotificationCredentials();
            
            const registerResponse = await Ezer.post("/auth",{...signupForm, ...notificationCredentails}, {params:{authType:'signup'}});
            const token = registerResponse.data.data;
            await AsyncStorage.setItem("TOKEN",token);
            let newUser = null;
            let imageURL = "";
            if(capturedPhoto !== null) {
                delete signupForm.password;
                delete signupForm.expoPushToken;
                imageURL = await uploadImageToS3(capturedPhoto);
                signupForm.image = imageURL;
                const updateResponse = await Ezer.post("/auth",{
                    ...signupForm, 
                    pushNotificationsEnabled:notificationCredentails.pushNotificationsEnabled
                }, 
                {
                    params:{
                        authType:"updateuser"
                    }
                });
                newUser = updateResponse.data.data;
            } else {
                const getMeResponse = await Ezer.post('/auth',{}, {params:{authType:'getme'}});
                newUser = getMeResponse.data.data;
            }
            await dispatch(getRelations());
            dispatch(setPhoto(null));
            return {newUser, token}
        } catch(error) {
            console.log(error, error.message);
            return rejectWithValue(error.response?.data?.data);
        }
    }
)


export const loginWithAuthToken = createAsyncThunk(
    "auth/loginWithAuthToken",
    async ({}, {rejectWithValue, getState, dispatch})=> {
        try {
            const fetchedToken = await AsyncStorage.getItem("TOKEN");
            await dispatch(getMe());
            dispatch(setToken(fetchedToken));
        } catch(error) {
            console.log('ERROR!', error.message, error);
        }
    }
)


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
            return user;
        } catch(error) {
            return rejectWithValue(error.response.status);
        }
    }
)

