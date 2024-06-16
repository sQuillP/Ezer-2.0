import { createStackNavigator } from "@react-navigation/stack";
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import Login from "../screens/Login/Login";
import Signup from "../screens/Signup/Signup";
import TabNavigation from "./TabNavigation";
import Settings from "../screens/Settings/Settings";
import AddFriend from "../screens/AddFriend/AddFriend";
import ViewProfile from "../screens/ViewProfile/ViewProfile";

import {useDispatch} from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Camera from '../screens/Camera/Camera';
import promptPushNotifications from "../global-components/notifications/promptPushNotifications";
import { loginWithAuthToken } from "../redux/thunk/authThunk";


const Stack = createStackNavigator();


/**
 * @todo: 
 *  1) deploy notifications in lambda
 *  2) set up push token in login/signup
 *  3) set up push notification configuration for a user.
 *  4) deploy aws layer for push notifications
 */
export default function RootNavigation() {


    const { user, token } = useSelector(store => store.auth);
    const dispatch = useDispatch();



    useEffect(()=> {
        (async ()=> {
            await promptPushNotifications();
        })();
    },[]);

    /**
     * @description Make sure that push notifications are all fetched
     * before automatically logging the user in.
     */
    useEffect(()=> {
        ( async ()=> {
            try {
                const token = await AsyncStorage.getItem('TOKEN');
                if(token === null) {return;}
                dispatch(loginWithAuthToken());
            } catch(error) {
            }
        })();
    },[]);





    function isLoggedIn() {
        return token !== null && user !== null;
    }


    return (
        <Stack.Navigator
        >
        {
            isLoggedIn() === false ? (
                <>
                    <Stack.Screen 
                        name='Login' 
                        component={Login}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name="Signup"
                        component={Signup}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name="Camera"
                        component={Camera}
                        options={{
                            headerShown:false
                        }}
                    />
                </>
            ):(
                <>
                    <Stack.Screen
                        name="TabNavigation"
                        component={TabNavigation}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name="Camera"
                        component={Camera}
                        options={{headerShown:false}}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                            headerBackTitle:"Back"
                        }}
                    /> 
                    <Stack.Screen
                        name="ViewProfile"
                        component={ViewProfile}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="AddFriend"
                        component={AddFriend}
                        options={{
                            headerBackTitle:"Back",
                            headerTitle:"Add Friend",
                        }} 
                    />
                </>
            )
        }
        </Stack.Navigator>
    );
}