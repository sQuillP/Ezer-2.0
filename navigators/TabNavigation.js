import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/Home/Home";
import palette from "../global-components/palette";
import Friends from "../screens/Friends/Friends";
import Profile from "../screens/Profile/Profile";
import { Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { View } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();



export default function TabNavigation() {


    const navigation = useNavigation();

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
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        headerRight: (props)=> {
                            return (
                                <Pressable onPress={()=> null}>
                                    <View style={{marginRight: '20%'}}>
                                        <AntDesign name="adduser" size={40} color={palette.light} />
                                    </View>
                                </Pressable>
                            )
                        },
                        headerLeft: (props)=> {
                            return (
                                <Pressable onPress={()=> navigation.navigate('Settings')}>
                                    <View style={{marginLeft: '20%'}}>
                                        <Octicons name="gear" size={30} color={palette.light} />
                                    </View>
                                </Pressable>
                            )
                        },
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: palette.blue,
                            borderBottomWidth: 0,
                            borderColor: palette.blue
                        },
                        headerShadowVisible: false,
                        headerTitle:''
                    }}
                />
            </Tab.Navigator>
        </>
    )

}