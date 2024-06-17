import {
    View, 
    StyleSheet,
    Text,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Camera } from 'expo-camera';

import styles from './styles/EditProfileDetails';
import { useEffect, useState } from 'react';
import EText from '../../global-components/EText/EText';
import deepEquals from 'lodash/isEqual';
import { AntDesign } from '@expo/vector-icons';
import palette from '../../global-components/palette';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slice/authSlice';
import { Ezer } from '../../http/Ezer';
import { useNavigation } from '@react-navigation/native';
import useImagePicker from '../../global-components/ImagePicker/imagePicker';
import { setPhoto } from '../../redux/slice/dataSlice';
import { uploadImageToS3 } from '../../http/s3/s3';
import getNotificationCredentials from '../../global-components/notifications/getNotificationCredentials';



const initialFormValue = {
    firstName: "William",
    lastName:"Pattison"
}

const mapFormValue = {
    email: 'Email',
    password:'Password',
    firstName:'First Name',
    lastName:'Last Name',
    username:'User name'
};



const default_image_path = "../../assets/png/unknown_user.jpg"


export default function EditProfileDetails() {

    const {user} = useSelector(store => store.auth);

    const { capturedPhoto } = useSelector(store => store.data);

    const dispatch = useDispatch();

    const [profileForm, setProfileForm] = useState({firstName: user?.firstName, lastName: user?.lastName});

    const [editField, setEditField] = useState('');

    const [modifiedProfile, setModifiedProfile] = useState(false);

    /* original settings form to revert back to */
    const [oldProfileForm, setOldProfileForm] = useState({firstName:user?.firstName, lastName: user?.lastName});

    /* Current profile image that user has selected */
    const [profileImageDisplay, setProfileImageDisplay] = useState(null);

    const [profileImageData, setProfileImageData] = useState(null);

    const [updateMePending, setUpdateMePending] = useState(false);

    const navigation = useNavigation()

    /**
     * @description Update profile details when user types in the fields to modify
     * firstname or lastname.
     */
    function handleProfileSettingsFormChange(value,field) {
        //apply any field validation middleware
        const updatedFormField = {
            ...profileForm,
            [field]:value.trim()
        };

        const deepEq = deepEquals(updatedFormField, oldProfileForm);
        if(deepEq === false){
            setModifiedProfile(true);
        }
        else if(modifiedProfile){
            setModifiedProfile(false);
        }

        setProfileForm(updatedFormField);
    }

    async function onSaveProfileChanges() {
        console.log('modifiedprofile', profileForm);
        try {
            setUpdateMePending(true);
            const updatePayload = {...user};
            if(profileForm.firstName.trim()) {
                updatePayload.firstName = profileForm.firstName;
            }
            if(profileForm.lastName.trim()) {
                updatePayload.lastName = profileForm.lastName;
            }
            let url = user.image;
            if(capturedPhoto !== null) {
                console.log('uploading to s3')
                url = await uploadImageToS3(capturedPhoto);
            }
            // 'username','firstName','lastName', 'sobrietyDate', 'image',"pushNotificationsEnabled"
            updatePayload.image = url;
            const {pushNotificationsEnabled} = await getNotificationCredentials();
            console.log({...updatePayload, pushNotificationsEnabled});
            console.log("PUSHNOTIFICATIONS ENABLED::: ", pushNotificationsEnabled)
            const profileUpdateResponse = await Ezer.post('/auth',{...updatePayload, pushNotificationsEnabled}, {params:{authType:'updateuser'}});
            const updatedProfile = profileUpdateResponse.data.data;
            dispatch(setUser(updatedProfile));
            dispatch(setPhoto(null));
            setModifiedProfile(false);
        } catch(error) {
            console.log("Error from updating user.")
            onDiscardFormChanges();
            console.log(error,error.message);
        } finally {
            setUpdateMePending(false);
        }
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

    /**
     * @description revert back to the old profile details
     */
    function onDiscardFormChanges() {
        setModifiedProfile(false);
        setProfileForm({...oldProfileForm});
        setProfileImageData(null);
        dispatch(setPhoto(null));
    }


    /**
     * @description: make sure that changes reflect from the redux store.
     */
    useEffect(()=> {
        setProfileForm({firstName: user?.firstName, lastName: user?.lastName});
        setOldProfileForm({firstName: user?.firstName, lastName: user?.lastName});
    },[user]);

    /**
     * @description set modified profile to true when you captrue a new photo
     */
    useEffect(()=> {
        if(capturedPhoto !== null) {
            setModifiedProfile(true);
        }
    },[capturedPhoto]);


    return (
        <View style={styles.main}>
            <View style={styles.profileImgContainer}>
                <Text style={[styles.imgHeader]}>Edit Profile Image</Text>
                <TouchableOpacity 
                    style={{position:'relative'}}
                    onPress={onShowImageOptions}
                >
                {
                    (()=> {
                        if(capturedPhoto !== null) {
                            return (
                                <Image 
                                    resizeMode='cover' 
                                    style={styles.profileImage} 
                                    source={{uri: capturedPhoto.uri}}
                                    loadingIndicatorSource={require(default_image_path)}
                                />
                            )
                        } else if(user?.image !== "") {
                            return (
                                <Image
                                    resizeMode='cover' 
                                    style={styles.profileImage} 
                                    source={{uri: user?.image}}
                                    loadingIndicatorSource={require(default_image_path)}
                                />
                            )
                        } else {
                            console.log("default profile image")
                            return (
                                <Image
                                    resizeMode='cover' 
                                    style={styles.profileImage} 
                                    source={require(default_image_path)}
                                />
                            )
                        }
                    })()
                }
                    <View style ={{
                        position:'absolute', 
                        justifyContent:'center',
                        alignItems:'center',
                        top:0,
                        left:0,
                        right:0,
                        bottom:0,
                    }}>

                        <View
                            style={{
                                backgroundColor:'rgba(0,0,0,0.5)',
                                padding: 5,
                                borderRadius: 5
                            }}
                        >
                            <AntDesign 
                                name="camera" 
                                size={30} 
                                color="white"
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            {
                Object.keys(profileForm).map((item)=> {
                    return (
                        <View
                            key={item}
                            style={styles.row}
                        >
                            <View style={styles.labelContainer}>
                                <EText style={styles.label}>{mapFormValue[item]}</EText>
                                <EText style={styles.required}>*</EText>
                            </View>
                            <View style={styles.fieldWrapper}>
                                {
                                    editField === item ? (
                                        <>
                                            <TextInput 
                                                style={[styles.input, styles.baseFont]}
                                                secureTextEntry={item === 'password'}
                                                onChangeText={(value)=> handleProfileSettingsFormChange(value,item)}
                                                value={profileForm[item]} 
                                                onEndEditing={()=> setEditField('')}
                                            />
                                            <TouchableOpacity 
                                                onPress={()=> setEditField('')}
                                                style={[styles.cancelField, styles.baseFont]}
                                            >
                                                <Feather name='x' size={24} color={'gray'}/>
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <View style={styles.noEditField}>
                                            <Text style={[styles.baseFont]}>{item === 'password' ? "*".repeat(profileForm[item].length) :profileForm[item]}</Text>
                                            <TouchableOpacity
                                                onPress={()=> setEditField(item)}
                                            >
                                                <Feather name='edit' size={20} color={'gray'}/>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    )
                })
            }
            <View>
                <TouchableOpacity
                    onPress={onSaveProfileChanges}
                    style={[styles.saveBtn, {opacity:(modifiedProfile === false || updateMePending) ? 0.5: 1}]}
                    disabled={modifiedProfile === false || updateMePending}
                >
                    <EText
                        style={[{
                            color:'white',
                            fontWeight:'bold',
                            textAlign:'center',
                            
                        }, styles.baseFont]}
                    >Save Changes</EText>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onDiscardFormChanges}
                    style={[{...styles.saveBtn, backgroundColor:palette.blue}, {opacity: (modifiedProfile === false || updateMePending ) ? 0.5 : 1}]}
                    disabled={modifiedProfile === false || updateMePending}
                
                >
                    <EText
                        style={[{
                            color:'white',
                            fontWeight:'bold',
                            textAlign:'center',
                        }, styles.baseFont]}
                    >Discard changes</EText>
                </TouchableOpacity>
            </View>
        </View>
    );
}