import { 
    Image, 
    View, 
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar,
    ActivityIndicator,
} from "react-native"
import SafeAreaView from "../../global-components/SafeAreaView/SafeAreaView";
import { useState } from "react";
import styles from './styles/Login';
import EText from "../../global-components/EText/EText";
import palette from "../../global-components/palette";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { login } from "../../redux/thunk/authThunk";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const {
        invalidLoginCredentials, 
        loginPending, 
        internalServerError
    } = useSelector(store => store.auth);


    const dispatch = useDispatch();
    const navigation = useNavigation();



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
                <SafeAreaView>
                    <View style={styles.main}>
                        <StatusBar barStyle={"dark-content"}/>
                        <View style={styles.topContent}>
                            <Image
                                style={styles.image} 
                                source={require('../../assets/png/ezer-logo-green.png')}
                                />
                            <View style={styles.form}>
                                <View style={styles.formItem}>
                                    <EText style={styles.label}>Username:</EText>
                                    <TextInput 
                                        style={styles.input}
                                        value={username}
                                        onChangeText={(e)=> setUsername(e)}
                                    />
                                </View>
                                <View style={styles.formItem}>
                                    <EText style={styles.label}>Password:</EText>
                                    <TextInput
                                        secureTextEntry={true}
                                        style={styles.input}
                                        value={password}
                                        onChangeText={(e)=> setPassword(e)}
                                    />
                                </View>
                                <View>
                                    {internalServerError === true && <EText style={styles.errorText}>Server is not responding.</EText>}
                                    {invalidLoginCredentials === true && <EText style={styles.errorText}>Invalid login credentials.</EText>}
                                </View>
                                <View style={[styles.buttons]}>
                                {
                                    loginPending === true ? (
                                        <ActivityIndicator size={'large'}/>
                                    ):(
                                        <>
                                            <TouchableOpacity onPress={()=> dispatch(login({username, password}))}>
                                                <View style={[styles.button,{backgroundColor:palette.green }]}>
                                                    <EText style={styles.buttonText}>Log in</EText>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=> navigation.navigate('Signup')}>
                                                <View style={[styles.button, {backgroundColor:palette.blue}]}>
                                                    <EText style={styles.buttonText}>Sign up</EText>
                                                </View>
                                            </TouchableOpacity>
                                        </>
                                    )
                                }
                                </View>
                            </View>
                        </View>
                        <View style={styles.bottomContent}>

                        </View>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}