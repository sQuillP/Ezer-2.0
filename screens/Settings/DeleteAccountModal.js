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
const LOCKED_ERROR = "Please wait 3 minutes before attempting to delete your account";

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
        //Prevent accidental deletion by just clearing the fields.
        setPassword("");
        setPassphrase("");

        ( async ()=> {
            await shouldDisableAccountDeletion();
        })();
    },[visible]);



    /**
     * @description Increment the number of retries that a user has failed to
     * delete their account. This function must only be called when user attempts an unsuccessful
     * delete due to invalid password.
     * @throws Error if async storage fails somehow.
     */
    async function incrementRetry() {
        try {
            //Fetch count from async storage
            const currentCount = parseInt(((await AsyncStorage.getItem(storageKeys.INVALID_PASSWORD_COUNTER)) || 0), 10 );
            //cast as int
            const invalidDeleteCounter = Number((currentCount || 0));
            //update async storage with the count + 1 as the increment.
            await AsyncStorage.setItem(storageKeys.INVALID_PASSWORD_COUNTER,(invalidDeleteCounter+1).toString());

            //add timestamp if delete counter >= max_retries.
            if(invalidDeleteCounter + 1 >= MAX_RETRIES) {
                const punishTimeStamp = (new Date().getTime()+RESET_DURATION).toString();
                await AsyncStorage.setItem(storageKeys.RETRY_TIMESTAMP, punishTimeStamp);
                setErrorMessage(LOCKED_ERROR);
                setCooldownError(true);
            }
        } catch(error) {
            console.log('async storage failed');
        }
    }


    /**
     * @description: Updates UI to either enable or disable account deletion
     * depending if the current time is past the allotted punishment duration.
     * If it is past the punishment duration, then reset the invalid password counter.
     * This function should be called when opening up the modal component
     */
    async function shouldDisableAccountDeletion(){
        try {
            const timestamp = parseInt(((await AsyncStorage.getItem(storageKeys.RETRY_TIMESTAMP)) || 0), 10);
            if(Date.now() < timestamp){
                //lock delete button
                setCooldownError(true);
                setErrorMessage(LOCKED_ERROR);
            } else {
                // unlock the delete button and reset the retry counter.
                await AsyncStorage.setItem(storageKeys.INVALID_PASSWORD_COUNTER, '0');
                setCooldownError(false);
                setErrorMessage("");
            }
        } catch(error) {
            //unlock everything if async storage is not working correctly.
            setCooldownError(false);
            setErrorMessage("")
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
                await incrementRetry();
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