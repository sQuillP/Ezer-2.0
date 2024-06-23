import { Keyboard, Pressable, StatusBar, TextInput, View } from "react-native";

import styles from './styles/AddFriend';
import { FontAwesome5 } from '@expo/vector-icons';
import SafeAreaView from '../../global-components/SafeAreaView/SafeAreaView';
import { useEffect, useState } from "react";
import EText from "../../global-components/EText/EText";
import palette from "../../global-components/palette";
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import { Ezer } from "../../http/Ezer";
import { syncRelations } from "../../redux/slice/friendsSlice";

export default function AddFriend({navigation}) {

    // Main component state.
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loadingRequest, setLoadingRequest] = useState(false);

    //Redux state
    const {user} = useSelector(store => store.auth);
    const { relations } = useSelector(store => store.friends);
    const dispatch = useDispatch();


    function onReset() {
        setErrorMessage("");
        setSuccessMessage("");
        setLoadingRequest(false);
        setUsername('');
    }
    

    /**
     * @edescription check if search term is already in one of the invites, or friends lists.
     * @returns {boolean} true if user is already added to one of their relations.
     */
    function checkIfAddedAlready() {
        for(const key of Object.keys(relations)) {
            if(relations[key].find(user => user.username === username) !== undefined) {
                return true;
            }
        }
        return false;
    }

    // clear success message and show the error message.
    function error(_error) {
        setSuccessMessage("");
        setErrorMessage(_error)
    }

    //clear error message and show the success message.
    function success(_success) {
        setErrorMessage('');
        setSuccessMessage(_success);
    }


    /**
     * @description Run through the following checks:
     * 1. Check if user is already addeed in one of the relations
     * 2. Make sure that user is not adding themself.
     * 3. Make sure that user exists.
     * 4. Send friend request to the user, then sync updated relations.
     * @returns {Promise<undefined>}
     */
    async function onAddUser() {
        try {
            const cpyUsername = username
            if(checkIfAddedAlready() === true) {
                error(`User "${cpyUsername}" is already added to your relations`);
            } else if(user.username === username) {
                error("You cannot add yourself!")
            } else {
                setLoadingRequest(true);
                const existResponse = await Ezer.get('/friends', {params:{search:username}});
                const exists = existResponse.data.data;
                if(exists === null) {
                    error(`User "${cpyUsername}" does not exist`);
                    setLoadingRequest(false);
                    return;
                }
                const addUserResponse = await Ezer.post('/friends',
                    {username:username},
                    {params:{action:'create'}}
                );
                const updatedRelations = addUserResponse.data.data;
                dispatch(syncRelations(updatedRelations));
                success(`Success! Invite has been sent to "${cpyUsername}`)
            }
        } catch(error) {
            if(typeof error?.response?.data?.data === 'string'){
                error(error.response.data.data);
            } else {
                error("Unable to add friend at this time. This might be due to an unresolved bug.");
            }
        } finally {
            setLoadingRequest(false);
        }
    }


    //Clear the state of the screen when user navigates back to it.
    useEffect(()=> {
        const unsubscribe = navigation.addListener('focus', ()=> {
            console.log('resetting screen');
            onReset();
        });
        return unsubscribe
    },[navigation])


    return (
        <Pressable style={{flex: 1}} onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <StatusBar barStyle={'dark-content'}/>
                <View style={styles.main}>
                    <View style={styles.content}>
                        <View>
                            <EText style={styles.header}>You can add friends with their username</EText>
                            <View style={{marginTop: '20%'}}>
                                {
                                    errorMessage && (<EText style={{color: palette.error, marginBottom: 10}}>{errorMessage}</EText>)
                                }
                                {
                                    successMessage && <EText style={{color: palette.green, marginBottom: 10}}>{successMessage}</EText>
                                }
                                <View style={styles.inputcontainer}>
                                    <FontAwesome5 style={{paddingRight: 5}} name="user-friends" size={24} color="black" />
                                    <TextInput
                                        style={styles.input}
                                        value={username}
                                        onChangeText={(e)=> setUsername(e)}
                                        placeholder="Please enter exact username"
                                    />
                                    {
                                        username.trim().length > 0 && (
                                        <Pressable onPress={()=> onReset()} style={{marginRight: 5}}>
                                            <Ionicons name="close" size={30} color={'black'}/>
                                        </Pressable>
                                        )
                                    }
                                </View>
                            </View>
                        </View>
                        <Pressable 
                            onPress={onAddUser}
                            disabled={username.trim() === '' || loadingRequest}
                        >
                            {
                                ({pressed})=> {
                                    return (
                                        <View style={[styles.button,{opacity: (pressed||username.trim() === '' || loadingRequest) ? 0.5:1, backgroundColor: palette.green}]}>
                                            <EText style={styles.btnText}>Add Friend +</EText>
                                        </View>
                                    )
                                }
                            }
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </Pressable>
    )
}