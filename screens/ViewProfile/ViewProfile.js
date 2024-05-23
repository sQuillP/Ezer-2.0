import { Image, Pressable, StatusBar, View } from "react-native";

import styles from './styles/ViewProfile';
import SafeAreaView from "../../global-components/SafeAreaView/SafeAreaView";
import EText from "../../global-components/EText/EText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ViewProfile({ route }) {

    const {user} = route.params;

    console.log(user);
    const { top, left, bottom, right} = useSafeAreaInsets();


    return (
        <View style={[styles.container, {paddingTop: top, paddingLeft: left, paddingRight: right}]}>
            <StatusBar barStyle={'dark-content'}/>
            <View style={styles.main}>
                <View style={styles.top}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/png/unknown_user.jpg')}
                    />
                </View>
                <View style={[styles.bottom, {paddingBottom: bottom}]}>
                    <View>
                        <EText style={styles.title}>@{user.username}</EText>
                        <EText>{user.firstName} {user.lastName}</EText>
                    </View>
                    <Pressable onPress={()=> null}>
                        {
                            ({pressed})=> {
                                return (
                                    <View>
                                        <EText>Add Friend</EText>
                                    </View>
                                )
                            }
                        }
                    </Pressable>
                </View>
            </View>
        </View>
    );
}