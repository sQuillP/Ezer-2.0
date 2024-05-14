import { useState } from "react";
import SafeAreaView from "../../global-components/SafeAreaView/SafeAreaView";
import styles from './styles/SignupStyles';
import {
    View,
    Text,
    Pressable
} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import palette from "../../global-components/palette";
import { useNavigation } from "@react-navigation/native";
import EText from "../../global-components/EText/EText";

DEFAULT_FORM = {
    username:'',
    firstName:'',
    lastName:'',
    password:'',
};

export default function Signup() {

    const [signupForm, setSignupForm] = useState(DEFAULT_FORM);

    const navigation = useNavigation();

    function handleChange(name, update) {
        setSignupForm({...signupForm, [name]:update});
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
            <SafeAreaView>
                <View style={styles.main}>
                    <View style={styles.header}>
                        <EText style={styles.headerText}>Sign Up</EText>
                    </View>
                    <View style={styles.form}>
                        <View style={styles.formItem}>
                            <EText style={styles.label}>Username</EText>
                            <TextInput 
                                onChangeText={(e)=> handleChange('username',e)}
                                style={styles.input}/>
                        </View>
                        <View style={styles.formItem}>
                            <EText style={styles.label}>Password</EText>
                            <TextInput 
                                onChangeText={(e)=> handleChange('password', e)}
                                secureTextEntry={true}
                                style={styles.input}/>
                        </View>
                        <View style={styles.formItem}>
                            <EText style={styles.label}>First Name</EText>
                            <TextInput 
                                onChangeText={(e)=> handleChange('firstName', e)}
                                style={styles.input}/>
                        </View>
                        <View style={styles.formItem}>
                            <EText style={styles.label}>Last Name</EText>
                            <TextInput 
                                onChangeText={(e)=> handleChange('lastName', e)}
                                style={styles.input}/>
                        </View>
                    </View>
                    <View style={{alignItems:'center', marginTop:50}}>
                        <Pressable>
                            {
                                ({pressed})=> {
                                    return (
                                        <View style={[styles.signup, {backgroundColor: pressed ? palette.darkgreen:palette.green, marginBottom: 10}]}>
                                            <EText style={styles.signupText}>Sign Up</EText>
                                        </View>
                                    )
                                }
                            }
                        </Pressable>
                    </View>
                    <View style={{alignItems:'center', justifyContent:'flex-end'}}>
                        <EText style={styles.account}>Already have an account?</EText>
                        <Pressable onPress={()=> navigation.navigate('Login')}>
                            <EText style={styles.account}>Tap here to sign in.</EText>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}