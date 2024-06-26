import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/Home/Home";
import palette from "../global-components/palette";
import Friends from "../screens/Friends/Friends";
import Profile from "../screens/Profile/Profile";
import { Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { View } from "react-native";
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { HomeIcon, FriendsIcon, ProfileIcon } from "../svg/Icons";

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
                    },
                    title:''
                }}
            >
                <Tab.Screen
                    name="Friends"
                    component={Friends}
                    options={{
                        tabBarIcon: ()=> <FriendsIcon height={50} width={50}/>
                    }}
                />
                <Tab.Screen 
                    name='Home' 
                    options={{
                        tabBarIcon:()=> <HomeIcon height={50} width={50}/>,
                        title:""
                    }}
                    component={Home}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        headerRight: (props)=> {
                            return (
                                <Pressable onPress={()=> navigation.navigate('AddFriend')}>
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
                        headerTitle:'',
                        tabBarIcon: ()=> <ProfileIcon height={50} width={50}/>
                    }}
                />
            </Tab.Navigator>
        </>
    )

}