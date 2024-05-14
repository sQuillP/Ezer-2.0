import { 
    Image, 
    Text, 
    View, 
    TextInput,
    Pressable, 
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar,
} from "react-native"
import SafeAreaView from "../../global-components/SafeAreaView/SafeAreaView";
import { useState } from "react";
import styles from './styles/Login';
import EText from "../../global-components/EText/EText";
import palette from "../../global-components/palette";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";


export default function Login() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                                        onChangeText={(e)=> setUsername(e)}
                                    />
                                </View>
                                <View style={styles.formItem}>
                                    <EText style={styles.label}>Password:</EText>
                                    <TextInput
                                        secureTextEntry={true}
                                        style={styles.input}
                                        onChangeText={(e)=> setPassword(e)}
                                    />
                                </View>
                                <View style={[styles.buttons]}>
                                    <TouchableOpacity onPress={()=> null}>
                                        <View style={[styles.button,{backgroundColor:palette.green }]}>
                                            <EText style={styles.buttonText}>Log in</EText>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=> navigation.navigate('Signup')}>
                                        <View style={[styles.button, {backgroundColor:palette.blue}]}>
                                            <EText style={styles.buttonText}>Sign up</EText>
                                        </View>
                                    </TouchableOpacity>
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