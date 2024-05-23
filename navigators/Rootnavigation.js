import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login/Login";
import Signup from "../screens/Signup/Signup";
import TabNavigation from "./TabNavigation";
import Settings from "../screens/Settings/Settings";
import AddFriend from "../screens/AddFriend/AddFriend";
import ViewProfile from "../screens/ViewProfile/ViewProfile";


const Stack = createStackNavigator();


export default function RootNavigation() {

    return (
        <Stack.Navigator
        >
            {/* <Stack.Screen 
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
            /> */}
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
        </Stack.Navigator>
    );
}