import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { Ezer } from "../../http/Ezer";
import { useState } from "react";
import styles from './styles/DeleteAccount';
import EText from "../../global-components/EText/EText";
import palette from "../../global-components/palette";
import DeleteAccountModal from "./DeleteAccountModal";


export default function DeleteAccount() {


    const [errorMessage, setErrorMessage] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [password, setPassword] = useState('');
    const [passphrase, setPassphrase] = useState('');


    return (
        <View>
            <DeleteAccountModal
                onRequestClose={()=> setOpenModal(false)}
                visible={openModal}
            />
            <EText style={{marginTop: 10}}>Permanently delete your account and all data associated with this
            application. This requires confirmation using your password and a special passphrase.
            </EText>
            <Text style={[styles.bold, styles.text]}>
                WARNING: This action cannot be undone.
            </Text>
            <Pressable
                onPress={()=> setOpenModal(true)}
            >
                {
                    ({pressed})=> {
                        return (
                            <View style={[styles.btn, {backgroundColor: pressed ? palette.darkerror: palette.error}]}>
                                <Text style={[styles.bold,styles.btnText]}>Delete Account</Text>
                            </View>
                        )
                    }
                }
            </Pressable>
        </View>
    );
}