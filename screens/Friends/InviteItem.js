import { View, Pressable, Image, } from "react-native";
import styles from './styles/FriendItemStyle';
import EText from "../../global-components/EText/EText";
import palette from "../../global-components/palette";



export default function InviteItem({invite, sent, last=false,}) {


    console.log(invite)
    return (
        <Pressable onPress={()=> null}>
        {
            ({pressed})=> {
                return (
                    <View style={[styles.main, last===true ?{}:styles.last, {opacity: pressed === true ? 0.5: 1}]}>
                        <Image 
                            source={require('../../assets/png/unknown_user.jpg')}
                            style={styles.image}
                        />
                        <View style={styles.contentContainer}>
                            <EText style={styles.topText}>{invite.firstName + " " + invite.lastName}</EText>
                            <View style={styles.bottomContent}>
                                <EText style={styles.bottomText}>@{invite.username}</EText>
                                {
                                    sent === true ? (
                                    <View style={styles.chip}><EText style={styles.chipText}>Pending</EText></View>
                                    ): (
                                        <View style={styles.btns}>
                                            <Pressable style={[{marginRight: 10}]} onPress={()=> console.log("rejecting")}>
                                                <View style={[styles.chip, {backgroundColor: palette.error}]}>
                                                    <EText style={[styles.chipText]}>Reject</EText>
                                                </View>
                                            </Pressable>
                                            <Pressable onPress={()=> console.log('accepting')}>
                                                <View style={[styles.chip, {backgroundColor: palette.green}]}>
                                                    <EText style={styles.chipText}>Accept</EText>
                                                </View>
                                            </Pressable>
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                )
            }
        }
        </Pressable>
    )
}