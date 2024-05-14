import { useState } from "react";
import EText from "../../global-components/EText/EText";
import SafeAreaView from "../../global-components/SafeAreaView/SafeAreaView";
import palette from "../../global-components/palette";
import styles from './styles/FriendsStyle';
import { View } from "react-native";

export default function Friends() {

    const [renderMode, setRenderMode] = useState('friends');

    return (
        <SafeAreaView style={{backgroundColor: palette.blue}}>
            <View style={styles.main}>
                <View style={styles.header}>
                    <EText style={styles.headerText}>Manage Friends</EText>
                </View>
            </View>
        </SafeAreaView>
    )
}