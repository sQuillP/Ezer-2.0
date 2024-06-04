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
import { getMe } from "../redux/thunk/authThunk";
import { setToken } from "../redux/slice/authSlice";
const Stack = createStackNavigator();


export default function RootNavigation() {


    const { user, token } = useSelector(store => store.auth);
    const dispatch = useDispatch();


    useEffect(()=> {
        ( async ()=> {
            try {
                const token = await AsyncStorage.getItem('TOKEN');
                if(token === null) {return;}
                dispatch(getMe());
                dispatch(setToken(token));
            } catch(error) {
                // error fetching token
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
                        name="Settings"
                        component={Settings}
                        options={{
                            // headerShown:false
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