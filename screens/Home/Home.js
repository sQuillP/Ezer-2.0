import { useState } from "react";
import EText from "../../global-components/EText/EText";
import SafeAreaView from "../../global-components/SafeAreaView/SafeAreaView";
import palette from "../../global-components/palette";
import ConfirmModal from "./ConfirmModal";
import styles from './styles/HomeStyle'
import { Text, View, Image, Pressable } from "react-native";


export default function Home() {

    const [showModal, setShowModal] = useState(false);

    return (
        <SafeAreaView style={{backgroundColor: palette.blue}}>
            <View style={styles.main}>
                <ConfirmModal
                    visible={showModal}
                    onRequestClose={()=> setShowModal(false)}
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