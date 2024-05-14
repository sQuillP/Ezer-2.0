import { Modal, View, Pressable } from "react-native";
import styles from './styles/ConfirmModalStyles';
import EText from "../../global-components/EText/EText";
import palette from "../../global-components/palette";

export default function ConfirmModal({visible, onRequestClose}) {


    function onConfirmNotification() {
        console.log('some business logic');
        onRequestClose();
    }

    return (
        <Modal
            visible={visible}
            onRequestClose={onRequestClose}
            transparent={true}
            animationType="slide"
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <EText style={styles.modalText}>Are you want to alert your friends?</EText>
                    <View style={{flexDirection:'row'}}>
                        <Pressable
                        style={[{marginRight:10, }]}
                        onPress={onConfirmNotification}>
                            {
                                ({pressed})=> {
                                    return (
                                        <View style={[styles.button, {backgroundColor:  pressed? palette.darkgreen :palette.green}]}>
                                            <EText style={styles.textStyle}>Yes, notify</EText>
                                        </View>
                                    )
                                }
                            }
                        </Pressable>
                        <Pressable
                            onPress={onRequestClose}
                        >
                            {
                                ({pressed})=> {
                                    return (
                                        <View style={[styles.button, {backgroundColor: pressed ? palette.darkerror:palette.error}]}>
                                            <EText style={styles.textStyle}>Actually, No</EText>
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