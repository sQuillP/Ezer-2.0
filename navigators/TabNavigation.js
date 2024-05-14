import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/Home/Home";
import palette from "../global-components/palette";
import Friends from "../screens/Friends/Friends";


const Tab = createBottomTabNavigator();



export default function TabNavigation() {

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle:{
                            backgroundColor:palette.blue,
                            borderTopWidth:0
                        }
                }}
            >
                <Tab.Screen 
                    name='Home' 
                    component={Home}
                />
                <Tab.Screen
                    name="Friends"
                    component={Friends}
                />
            </Tab.Navigator>
        </>
    )

}