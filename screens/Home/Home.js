import { useState } from "react";
import EText from "../../global-components/EText/EText";
import SafeAreaView from "../../global-components/SafeAreaView/SafeAreaView";
import palette from "../../global-components/palette";
import styles from './styles/HomeStyle'
import { View, Image, Pressable } from "react-native";
import CustomModal from "../../global-components/CustomModal/CustomModal";


export default function Home() {

    const [showModal, setShowModal] = useState(false);

    return (
        <SafeAreaView style={{backgroundColor: palette.blue}}>
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
                    <EText style={styles.headerText}>Welcome, William Pattison</EText>
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