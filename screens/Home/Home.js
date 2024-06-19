import { useState } from "react";
import EText from "../../global-components/EText/EText";
import SafeAreaView from "../../global-components/SafeAreaView/SafeAreaView";
import palette from "../../global-components/palette";
import styles from './styles/HomeStyle'
import { View, Image, Pressable, StatusBar, Alert } from "react-native";
import CustomModal from "../../global-components/CustomModal/CustomModal";
import { useSelector } from "react-redux";
import { Ezer } from "../../http/Ezer";


export default function Home() {

    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const {user} = useSelector(store => store.auth);


    /**
     * @description Call notification API to send push notifications to all friends.
     */
    async function onNotifyFriends() {
        try {
            setShowModal(false);
            console.log("notifying friends");
            const notificationResponse = await Ezer.post("/notify",{});
            console.log('friends have been notified');
            setShowSuccessModal(true);
        } catch(error) {
            Alert.alert("Unable to send notifications", "Please check your internet connection",[
                {text:"OK", onPress: ()=> null}
            ]);
        }
    }

    return (
        <SafeAreaView style={{backgroundColor: palette.blue}}>
            <StatusBar barStyle={'light-content'}/>
            <View style={styles.main}>
                <CustomModal
                    modalProps={{
                        visible:showModal,
                        onRequestClose: ()=> setShowModal(false),
                        animationType:'slide',
                        transparent:true
                    }}
                    title={"Are you want to alert your friends?"}
                    confirmText={"Yes, notify"}
                    declineText={"Actually, no"}
                    acceptAction={onNotifyFriends}

                />
                <CustomModal
                    modalProps={{
                        visible:showSuccessModal,
                        onRequestClose:()=> setShowSuccessModal(false),
                        animationType:'slide',
                        transparent: true
                    }}
                    title={"Your request has been successfully sent.!"}
                    confirmText={"Awesome"}
                    acceptAction={()=> setShowSuccessModal(false)}
                />
                <View style={styles.header}>
                    <EText style={styles.headerText}>Welcome, {`${user.firstName} ${user.lastName}`}</EText>
                </View>
                <View style={styles.mainButton}>
                    <Pressable onPress={()=> setShowModal(true)}>
                        <View>
                            <Image source={require('../../assets/png/ezer-quote-green.png')}/>
                        </View>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}