import { Modal, View, Pressable } from "react-native";
import styles from './styles/CustomModalStyle';
import EText from "../EText/EText";
import palette from "../palette";

export default function CustomModal({modalProps,title, confirmText, declineText, acceptAction,}) {


    function onConfirmPress() {
        console.log('some business logic');
        acceptAction();
    }

    return (
        <Modal
            {...modalProps}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <EText style={styles.modalText}>{title}</EText>
                    <View style={{flexDirection:'row'}}>
                        <Pressable
                        style={[{marginRight:10, }]}
                        onPress={onConfirmPress}>
                            {
                                ({pressed})=> {
                                    return (
                                        <View style={[styles.button, {backgroundColor:  pressed? palette.darkgreen :palette.green}]}>
                                            <EText style={styles.textStyle}>{confirmText}</EText>
                                        </View>
                                    )
                                }
                            }
                        </Pressable>
                        <Pressable
                            onPress={modalProps.onRequestClose}
                        >
                            {
                                ({pressed})=> {
                                    return (
                                        <View style={[styles.button, {backgroundColor: pressed ? palette.darkerror:palette.error}]}>
                                            <EText style={styles.textStyle}>{declineText}</EText>
                                        </View>
                                    )
                                }
                            }
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}