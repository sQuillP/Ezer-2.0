import SafeAreaView from "../../global-components/SafeAreaView/SafeAreaView";
import styles from './styles/Profile'
import EText from "../../global-components/EText/EText";
import { Alert, Image, Pressable, StatusBar, View } from "react-native";
import palette from "../../global-components/palette";


export default function Profile() {

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

    async function onResetSobrietyCounter() {
        console.log('resetting the sobriety counter');
    }

    return (
        <SafeAreaView style={{backgroundColor: palette.blue}}>
            <StatusBar barStyle={'light-content'}/>
            <View style={[styles.main]}>
                <View style={styles.profileWrapper}>
                    <Image
                        source={require("../../assets/png/unknown_user.jpg")}
                        style={styles.image}
                    />
                    <View style={{marginVertical: 15}}>
                        <EText style={styles.username}>@William_pattison</EText>
                        <EText style={styles.fullname}>William Pattissson</EText>
                    </View>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.sobrietyCounter}>
                        <EText style={styles.sobersince}>20</EText>
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