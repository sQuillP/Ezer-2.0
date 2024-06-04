import { Keyboard, Pressable, TextInput, View } from "react-native";

import styles from './styles/AddFriend';
import { FontAwesome5 } from '@expo/vector-icons';
import SafeAreaView from '../../global-components/SafeAreaView/SafeAreaView';
import { useEffect, useState } from "react";
import EText from "../../global-components/EText/EText";
import palette from "../../global-components/palette";
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import { friendAction } from "../../redux/thunk/friendsThunk";
import { Ezer } from "../../http/Ezer";
import { setSentDisplayNotification } from "../../redux/slice/friendsSlice";

export default function AddFriend({navigation}) {

    const [username, setUsername] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [error, setError] = useState(false);
    const [sentRequest, setSentRequest] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const dispatch = useDispatch();
    const {loadingRelations, relationsError, displaySentNotification } = useSelector(store => store.friends);
    const [loadingUserExists, setLoadingUserExists] = useState(false);
     

    function onReset() {
        setSentRequest(false);
        setNotFound(false);
        setError(false);
        setUsername('');
        setErrorUsername('');
    }
    

    async function onAddUser() {
        try {
            setLoadingUserExists(true);
            const existsResponse = await Ezer.get('/friends',{params:{search:username}});
            const exists = existsResponse.data.data;

            if(exists === null) {
                setNotFound(true);
                dispatch(setSentDisplayNotification(false));
                setErrorUsername(username);
                setLoadingUserExists(false);
                return;
            }
            dispatch(friendAction({action:'create', username}));
            setLoadingUserExists(false);
        } catch(error) {
            console.log(error);
            //unable to reach server at this time.
        } 
    }


    //Clear the state of the screen when user navigates back to it.
    useEffect(()=> {
        const unsubscribe = navigation.addListener('focus', ()=> {
            console.log('resetting screen');
            dispatch(setSentDisplayNotification(false));
            onReset();
        });
        return unsubscribe
    },[navigation])


    return (
        <Pressable style={{flex: 1}} onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <View style={styles.main}>
                    <View style={styles.content}>
                        <View>
                            <EText style={styles.header}>You can add friends with their username</EText>
                            <View style={{marginTop: '20%'}}>
                                {
                                    notFound && (<EText style={{color: palette.error, marginBottom: 10}}>Unable to find "{errorUsername}"</EText>)
                                }
                                {
                                    displaySentNotification && <EText style={{color: palette.green, marginBottom: 10}}>Success! You have sent friend request to "{errorUsername}"</EText>
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
                                        <Pressable onPress={()=> setUsername('')} style={{marginRight: 5}}>
                                            <Ionicons name="close" size={30} color={'black'}/>
                                        </Pressable>
                                        )
                                    }
                                </View>
                            </View>
                        </View>
                        <Pressable 
                            onPress={onAddUser}
                            disabled={username.trim() === ''}
                        >
                            {
                                ({pressed})=> {
                                    return (
                                        <View style={[styles.button,{opacity: (pressed||username.trim() === '' || loadingRelations || loadingUserExists) ? 0.5:1, backgroundColor: palette.green}]}>
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