import { Image, View, Text, Pressable } from "react-native"

import styles from './styles/FriendItemStyle'
import EText from "../../global-components/EText/EText"
import { useNavigation } from "@react-navigation/native"


export default function FriendItem({friend, last=false}) {

    const navigation = useNavigation();

    return (
        <Pressable onPress={()=> navigation.navigate("ViewProfile",{user:friend})}>
        {
            ({pressed})=> {
                return (
                    <View style={[styles.main, last===true ?{}:styles.last, {opacity: pressed === true ? 0.5: 1}]}>
                        <Image 
                            source={require('../../assets/png/unknown_user.jpg')}
                            style={styles.image}
                        />
                        <View style={styles.contentContainer}>
                            <EText style={styles.topText}>{friend.firstName + " " + friend.lastName}</EText>
                            <EText style={styles.bottomText}>@{friend.username}</EText>
                        </View>
                    </View>
                )
            }
        }
        </Pressable>
    )
}