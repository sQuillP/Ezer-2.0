import { useEffect, useState } from "react"
import styles from './styles/DeleteAccount';
import { Modal, View, TextInput, Text, KeyboardAvoidingView, Pressable, ActivityIndicator } from "react-native";
import EText from "../../global-components/EText/EText";
import palette from "../../global-components/palette";
import { Entypo } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Platform } from "react-native";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/slice/authSlice";
import { Ezer } from "../../http/Ezer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import storageKeys from "../../global-components/storageKeys";


const PASSPHRASE = "Permanently Delete";
const MAX_RETRIES = 3;
const RESET_DURATION = 1000*60*3;

export default function DeleteAccountModal({
    visible,
    onRequestClose
}) {
    
    const [password, setPassword] = useState('');
    const [passphrase, setPassphrase]= useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [deletingAccount, setDeletingAccount] = useState(false);
    const [cooldownError, setCooldownError] = useState(false);

    const dispatch = useDispatch();

    function disableDelete() {
        return passphrase !== PASSPHRASE || password.length === 0 || deletingAccount === true || cooldownError;
    }


    useEffect(()=> {
        ( async ()=> {
            await canAttemptAccountDelete();
        })();
    },[visible]);



    async function updateStorageError() {
        try {
            const currentCount = await AsyncStorage.getItem(storageKeys.INVALID_PASSWORD_COUNTER)
            const invalidLoginCounter = Number((currentCount || 0));
            // disable the users ability to try again for another 3 minutes.\
            if(currentCount >= MAX_RETRIES) {
                const retryPunishment = (new Date().getTime()+RESET_DURATION).toString();
                await AsyncStorage.setItem(storageKeys.RETRY_TIMESTAMP,retryPunishment);
                setCooldownError(true);
                setErrorMessage("Please wait 3 minutes before attempting to delete your account");
            }
            await AsyncStorage.setItem(storageKeys.INVALID_PASSWORD_COUNTER,(invalidLoginCounter+1).toString());
        } catch(error) {
            console.log('async storage failed');
        }
    }


    async function canAttemptAccountDelete() {
        try {
            const timestamp = new Date(parseInt(await AsyncStorage.getItem(storageKeys.RETRY_TIMESTAMP), 10));
            console.log(timestamp);
            if(timestamp !== null && timestamp > Date.now()) {
                console.log('cannot attempt to delete');
                setErrorMessage("Please wait 3 minutes before attempting to delete your account.")
                return false;
            }
            await AsyncStorage.setItem(storageKeys.INVALID_PASSWORD_COUNTER,'0');
            return true;
        } catch(error) {
            //Just let the user delete if their storage is somehow full.
            return true;
        }
    }

    async function onDeleteAccount() {
        try {
            setDeletingAccount(true);
            setErrorMessage("");
            const deleteResponse = await Ezer.delete('/auth',{data:{password}, params:{authType:'deleteuser'}});
            await AsyncStorage.removeItem(storageKeys.TOKEN);
            dispatch(signOut());
        } catch(error) {
            if(error.response.status === 401){
                setErrorMessage("Invalid Password. Please try again");
                await updateStorageError();
            } else {
                setErrorMessage("Internal server error. Please check your connection");
            }
        } finally {
            setDeletingAccount(false);
        }
    }


    return (
        <Modal
            visible={visible}
            onRequestClose={onRequestClose}
            animationType="fade"
            transparent={true}
        >
            <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>Delete Account</Text>
                        <View style={styles.formItem}>
                            <EText style={styles.text}>Enter your password <Text style={[styles.bold,{color:palette.error}]}>*</Text></EText>
                            <View style={styles.inputContainer}>
                                <Entypo name="lock" size={24} color={'black'}/>
                                <TextInput
                                    onChangeText={_password=> setPassword(_password)}
                                    style={styles.input}
                                    secureTextEntry={true}
                                    value={password}
                                    autoComplete="off"
                                />
                            </View>
                            <View style={styles.formItem}>
                                <EText style={styles.text}>Please enter <Text style={[styles.bold, styles.text]}>"{PASSPHRASE}"</Text> <Text style={[styles.bold,{color: palette.error}]}>*</Text></EText>
                                <View style={styles.inputContainer}>
                                    <Entypo name="check" size={24} color="black" />
                                    <TextInput
                                        onChangeText={ _passphrase => setPassphrase(_passphrase)}
                                        value={passphrase}
                                        autoComplete='off'
                                        style={styles.input}
                                    />
                                </View>
                            </View>
                            {
                                errorMessage && <Text style={[styles.bold, {color: palette.error, textAlign:'center'}]}>{errorMessage}</Text>
                            }
                            {
                                deletingAccount === true ? (
                                    <View style={{justifyContent:'center', alignItems:'center'}}>
                                        <ActivityIndicator size={'large'} color={'black'}/>
                                    </View>
                                ):(
                                    <>

                                        <Pressable
                                            onPress={onDeleteAccount}
                                            disabled={disableDelete()}
                                        >
                                            {
                                                ({pressed})=> {
                                                    return (
                                                        <View style={[styles.btn, {backgroundColor: pressed ? palette.darkerror: palette.error, opacity: disableDelete() ? 0.5: 1}]}>
                                                            <Text style={styles.buttonText}>Delete Account</Text>
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
                                                        <View style={[styles.btn, {backgroundColor: pressed ? palette.darkblue: palette.blue}]}>
                                                            <Text style={styles.buttonText}>Cancel</Text>
                                                        </View>
                                                    )
                                                }
                                            }
                                        </Pressable>
                                    </>

                                )
                            }
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}