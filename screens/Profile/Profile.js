import SafeAreaView from "../../global-components/SafeAreaView/SafeAreaView";
import styles from './styles/Profile'
import EText from "../../global-components/EText/EText";
import { Alert, Image, Pressable, StatusBar, View } from "react-native";
import palette from "../../global-components/palette";
import { useSelector, useDispatch } from "react-redux";
import { Ezer } from "../../http/Ezer";
import { setUser } from "../../redux/slice/authSlice";
import getNotificationCredentials from "../../global-components/notifications/getNotificationCredentials";

export default function Profile() {

    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    console.log("USER?? ", user);

    function openConfirmMenu() {
        Alert.alert("Reset your sobriety counter?","This action cannot be undone",[
            {
                text:"Cancel",
                onPress: ()=> null,
                style:'destructive'
            },
            {
                text:"Ok",
                onPress: onResetSobrietyCounter,
                style:'default'
            }
        ])
    }


    function countSoberDays() {
        const sobrietyDate = new Date(Number(user.sobrietyDate));
        const difference = Math.floor((Date.now() - sobrietyDate)/(1000*86400));
        return difference;
    }


    async function onResetSobrietyCounter() {
        console.log('resetting the sobriety counter');
        try {
            const { pushNotificationsEnabled } = await getNotificationCredentials();
            const updateBody = {...user, pushNotificationsEnabled, sobrietyDate: Date.now().toString()}
            const updateResponse = await Ezer.put('/auth', updateBody,{params:{authType:'updateuser'}});
            const updatedUser = updateResponse.data.data;
            dispatch(setUser(updatedUser));
        } catch(error) {
            console.log(error, error.message);
            Alert.alert("Unable to reset counter", "Please check your connection",[{
                text:"Ok",
                onPress:()=> null
            }]);
        }
    }

    return (
        <SafeAreaView style={{backgroundColor: palette.blue}}>
            <StatusBar barStyle={'light-content'}/>
            <View style={[styles.main]}>
                <View style={styles.profileWrapper}>
                {
                    user.image ? (
                        <Image
                            source={{uri: user.image}}
                            style={styles.image}
                        />
                    ):(
                        <Image
                            source={require("../../assets/png/unknown_user.jpg")}
                            style={styles.image}
                        />
                    )
                }
                    <View style={{marginVertical: 15}}>
                        <EText style={styles.username}>@{user.username}</EText>
                        <EText style={styles.fullname}>{user.firstName + " " + user.lastName}</EText>
                    </View>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.sobrietyCounter}>
                        <EText style={styles.sobersince}>{countSoberDays()}</EText>
                    </View>
                    <Pressable onPress={openConfirmMenu}>
                        {
                            ({pressed})=> {
                                return (
                                    <View style={[styles.reset, {backgroundColor: pressed ? palette.darkgreen: palette.green}]}>
                                        <EText style={styles.resettext}>Reset</EText>
                                    </View>
                                );
                            }
                        }
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}