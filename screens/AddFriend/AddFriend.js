import { Keyboard, Pressable, TextInput, View } from "react-native";

import styles from './styles/AddFriend';
import { FontAwesome5 } from '@expo/vector-icons';
import SafeAreaView from '../../global-components/SafeAreaView/SafeAreaView';
import { useEffect, useState } from "react";
import EText from "../../global-components/EText/EText";
import palette from "../../global-components/palette";
import { Ionicons } from '@expo/vector-icons';

export default function AddFriend({navigation}) {

    const [username, setUsername] = useState('');
    const [error, setError] = useState(false);
    const [sentRequest, setSentRequest] = useState(false);
    const [notFound, setNotFound] = useState(false);


    function onReset() {
        setSentRequest(false);
        setNotFound(false);
        setError(false);
        setUsername('');
    }
    

    function onDebug() {
        setSentRequest(true);
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
                <View style={styles.main}>
                    <View style={styles.content}>
                        <View>
                            <EText style={styles.header}>You can add friends with their username</EText>
                            <View style={{marginTop: '20%'}}>
                                {
                                    notFound && (<EText style={{color: palette.error, marginBottom: 10}}>Unable to find "william mcglooberdunkies"</EText>)
                                }
                                {
                                    sentRequest && <EText style={{color: palette.green, marginBottom: 10}}>Success! You have sent friend request to "William McGlooberdunkies"</EText>
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
                        <Pressable onPress={onDebug}>
                            {
                                ({pressed})=> {
                                    return (
                                        <View style={[styles.button,{opacity: pressed ? 0.5:1, backgroundColor: palette.green}]}>
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