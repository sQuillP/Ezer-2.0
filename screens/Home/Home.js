import { useState } from "react";
import EText from "../../global-components/EText/EText";
import SafeAreaView from "../../global-components/SafeAreaView/SafeAreaView";
import palette from "../../global-components/palette";
import styles from './styles/HomeStyle'
import { View, Image, Pressable, StatusBar } from "react-native";
import CustomModal from "../../global-components/CustomModal/CustomModal";
import { useSelector } from "react-redux";


export default function Home() {

    const [showModal, setShowModal] = useState(false);

    const {user} = useSelector(store => store.auth);

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