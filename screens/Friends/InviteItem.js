import { View, Pressable, Image, } from "react-native";
import styles from './styles/FriendItemStyle';
import EText from "../../global-components/EText/EText";
import palette from "../../global-components/palette";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { friendAction } from "../../redux/slice/friendsSlice";


export default function InviteItem({invite, onShowConfirmModal, sent, last=false,}) {

    const navigation = useNavigation();

    const dispatch = useDispatch();


    function handleAccept() {
        dispatch(friendAction({action:'accept', username: invite.username}));
    }

    function handleCancelInvite() {
        dispatch(friendAction({delete_type:'invite', username:invite.username}));
    }

    return (
        <Pressable onPress={()=> navigation.navigate("ViewProfile", {user:invite})}>
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
                            <EText style={styles.bottomText}>@{invite.username}</EText>
                            <View style={styles.bottomContent}>
                                {
                                    sent === true ? (
                                    <View style={styles.btns}>
                                            <Pressable 
                                                onPress={handleCancelInvite}
                                                style={{marginRight: 5}}>
                                                {
                                                    ({pressed})=> {
                                                        return (
                                                            <View style={[styles.chip, {backgroundColor: pressed ? palette.darkerror: palette.error, paddingHorizontal: 30}]}>
                                                                <EText style={styles.chipText}>Cancel</EText>
                                                            </View>
                                                        )
                                                    }
                                                }
                                            </Pressable>
                                            {/* <View style={styles.chip}><EText style={styles.chipText}>Pending</EText></View> */}
                                    </View>
                                    ): (
                                        <View style={styles.btns}>
                                            <Pressable style={[{marginRight: 10}]} onPress={()=> onShowConfirmModal(true)}>
                                                <View style={[styles.chip, {backgroundColor: palette.error}]}>
                                                    <EText style={[styles.chipText]}>Reject</EText>
                                                </View>
                                            </Pressable>
                                            <Pressable 
                                                onPress={handleAccept}
                                            >
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