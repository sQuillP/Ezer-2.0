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

import styles from './styles/EditProfileDetails';
import { useState } from 'react';
import EText from '../../global-components/EText/EText';
import deepEquals from 'lodash/isEqual';
import { AntDesign } from '@expo/vector-icons';
import palette from '../../global-components/palette';


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

    const [profileForm, setProfileForm] = useState(initialFormValue);

    const [editField, setEditField] = useState('');


    const [modifiedProfile, setModifiedProfile] = useState(false);

    /* original settings form to revert back to */
    const [oldProfileForm, setOldProfileForm] = useState(initialFormValue);

    /* Current profile image that user has selected */
    const [profileImageDisplay, setProfileImageDisplay] = useState(null);

    const [profileImageData, setProfileImageData] = useState(null);

    const [updateMePending, setUpdateMePending] = useState(false);


    function handleProfileSettingsFormChange(value,field) {
        //apply any field validation middleware
        const updatedFormField = {
            ...profileForm,
            [field]:value.trim()
        };

        const deepEq = deepEquals(updatedFormField, oldProfileForm);
        if(deepEq === false)
            setModifiedProfile(true);
        else if(modifiedProfile)
            setModifiedProfile(false);

        setProfileForm(updatedFormField);
    }

    function onSaveProfileChanges() {

    }


    function onDiscardFormChanges() {
        setModifiedProfile(false);
        setProfileForm({...oldProfileForm});
        setProfileImageData(null);
    }


    return (
        <View style={styles.main}>
            <View style={styles.profileImgContainer}>
                <Text style={[styles.imgHeader]}>Edit Profile Image</Text>
                <TouchableOpacity 
                    style={{position:'relative'}}
                    onPress={()=> null}
                >
                    <Image 
                        resizeMode='cover' 
                        style={styles.profileImage} 
                        source={profileImageDisplay === null?require(default_image_path):{
                            uri: profileImageDisplay
                        }}
                        loadingIndicatorSource={require(default_image_path)}
                    />
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
                    style={[{...styles.saveBtn, backgroundColor:palette.blue}, {opacity: (modifiedProfile === false || updateMePending) ? 0.5 : 1}]}
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