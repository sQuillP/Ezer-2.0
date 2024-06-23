import { useState } from "react";
import SafeAreaView from "../../global-components/SafeAreaView/SafeAreaView";
import styles from './styles/SignupStyles';
import {
    View,
    Pressable,
    Image,
    Alert,
    ActivityIndicator
} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import palette from "../../global-components/palette";
import { useNavigation } from "@react-navigation/native";
import EText from "../../global-components/EText/EText";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AntDesign } from '@expo/vector-icons';
import { Camera } from "expo-camera";
import { setPhoto } from "../../redux/slice/dataSlice";
import useImagePicker from "../../global-components/ImagePicker/imagePicker";
import { signup } from "../../redux/thunk/authThunk";
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const DEFAULT_FORM = {
    username:'',
    firstName:'',
    lastName:'',
    password:'',
};

export default function Signup() {

    const [signupForm, setSignupForm] = useState(DEFAULT_FORM);

    const {signupPending, signupError} = useSelector(store=> store.auth);

    const navigation = useNavigation();

    const { capturedPhoto } = useSelector(store => store.data);


    const dispatch = useDispatch();


    function handleChange(name, update) {
        setSignupForm({...signupForm, [name]:update});
    }


    async function onSignup() {
        const body = {
            ...signupForm,
            sobrietyDate: new Date().getTime().toString(),
            image:""
        };
        dispatch(signup({signupForm: body}));
    }


    /**
     * Request permission to use camera and then
     * navigate to the camera screen.
     */
    async function onOpenCamera() {
        const {status} = await Camera.requestCameraPermissionsAsync();
        if(status !== 'granted') return;
        navigation.navigate("Camera");
    }

    /**
     * @description open camera roll and extract the selected image that user chooses.
     */
    async function onOpenCameraRoll() {
        const selectedImage = await useImagePicker();
        if(selectedImage === null) {
            return;
        }
        dispatch(setPhoto(selectedImage));
    }

    function onShowImageOptions() {
        Alert.alert("Update Profile Image", "Please choose from one of the following", [
            {text:"Camera roll", onPress: onOpenCameraRoll},
            {text:"Take Photo", onPress: onOpenCamera}
        ]);
    }


    function disableSignup() {
        return Object.keys(signupForm).some(key => signupForm[key].trim() === '');
    }


    return (
        <KeyboardAwareScrollView>
            <SafeAreaView>
                <View style={styles.main}>
                    <View style={styles.header}>
                        <Pressable
                            onPress={()=> navigation.goBack()}
                        >
                            {
                                ({pressed})=> {
                                    return (
                                        <Entypo name="chevron-left" size={30} color="black" />
                                    )
                                }
                            }
                        </Pressable>
                        <EText style={styles.headerText}>Sign Up</EText>
                        <Pressable
                            style={{}}
                            onPress={()=> setSignupForm({...DEFAULT_FORM})}
                        >
                            {
                              ({pressed})=> {
                                return (
                                    <Feather style={{opacity: pressed ? 0.5 : 1}} name="refresh-cw" size={30} color="black" />
                                )
                              }  
                            }
                        </Pressable>
                    </View>
                    <View style={styles.form}>
                        <View style={styles.formItem}>
                            <EText style={styles.label}>Username <EText style={{color:palette.error}}>*</EText></EText>
                            <TextInput 
                                onChangeText={(e)=> handleChange('username',e)}
                                value={signupForm.username}
                                style={styles.input}/>
                        </View>
                        <View style={styles.formItem}>
                            <EText style={styles.label}>Password <EText style={{color:palette.error}}>*</EText></EText>
                            <TextInput 
                                onChangeText={(e)=> handleChange('password', e)}
                                secureTextEntry={true}
                                value={signupForm['password']}
                                style={styles.input}/>
                        </View>
                        <View style={styles.formItem}>
                            <EText style={styles.label}>First Name <EText style={{color:palette.error}}>*</EText></EText>
                            <TextInput 
                                onChangeText={(e)=> handleChange('firstName', e)}
                                style={styles.input}
                                value={signupForm.firstName}
                            />
                        </View>
                        <View style={styles.formItem}>
                            <EText style={styles.label}>Last Name <EText style={{color:palette.error}}>*</EText></EText>
                            <TextInput 
                                value={signupForm.lastName}
                                onChangeText={(e)=> handleChange('lastName', e)}
                                style={styles.input}/>
                        </View>
                    </View>
                    <View style={styles.imageContainer}>
                        {
                            capturedPhoto !== null ? (
                                <Image
                                    style={styles.profileImage}
                                    source={{uri: capturedPhoto.uri}}
                                    loadingIndicatorSource={require("../../assets/png/unknown_user.jpg")}
                                />
                            ): (
                                <Image
                                    style={styles.profileImage}
                                    source={require("../../assets/png/unknown_user.jpg")}
                                />
                            )
                        }
                        <Pressable style={{marginTop: 30, marginBottom: 20}}
                            onPress={onShowImageOptions}
                        >
                            {
                                ({pressed})=> {
                                    return (
                                        <View style={{flexDirection:'row', alignItems:'center'}}>
                                            <EText style={{fontSize: 25}}>Add Photo</EText>
                                            <AntDesign style={{marginLeft: 10}} name="camerao" size={24} color="black" />
                                        </View>
                                    )
                                }
                            }
                        </Pressable>
                        {
                            capturedPhoto !== null && (
                                <Pressable
                                    onPress={()=> dispatch(setPhoto(null))}
                                >
                                    {
                                        ({pressed})=> {
                                            return (
                                                <View style={{marginVertical: 30, opacity: pressed ? 0.5 : 1}}>
                                                    <EText style={{color: palette.error, fontSize:20}}>Remove Image</EText>
                                                </View>
                                            )
                                        }
                                    }
                                </Pressable>
                            )
                        }
                    </View>
                    <View style={{flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                        { signupError && <EText style={styles.errorMessage}>{signupError}</EText>}
                        <Pressable
                            onPress={onSignup}
                            style={{width: '100%', alignItems:'center', opacity: disableSignup() ? 0.5: 1}}
                            disabled={disableSignup()}
                        >
                            {
                                ({pressed})=> {
                                    return (
                                        <View style={[styles.signup, {backgroundColor: pressed ? palette.darkgreen:palette.green, marginBottom: 10}]}>
                                            {signupPending ? <ActivityIndicator size={'large'} color={'white'}/> : <EText style={styles.signupText}>Sign Up</EText>}
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
    );
}