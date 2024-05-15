import { useState } from "react";
import EText from "../../global-components/EText/EText";
import SafeAreaView from "../../global-components/SafeAreaView/SafeAreaView";
import palette from "../../global-components/palette";
import styles from './styles/FriendsStyle';
import { Keyboard, KeyboardAvoidingView, Pressable, View } from "react-native";
import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import FriendsList from "./FriendsList";
import InviteList from "./InviteList";
import { FontAwesome } from '@expo/vector-icons';


import { DUMMY_FRIENDS, DUMMY_INVITES } from "./dummyData";



export default function Friends() {

    const [renderMode, setRenderMode] = useState('friends');
    const [searchTerm, setSearchTerm] = useState('');

    const [friends, setFriends] = useState([]);
    const [invites, setInvites] = useState([]);

    // Fetch friends and invites
    

    function handleSwitch(mode) {
        console.log('pressed');
        setRenderMode(mode);
    }


    function handleSearch(term) {

    }

    return (
            <SafeAreaView style={{backgroundColor: palette.blue}}>
                <View style={styles.main}>
                    <View style={styles.header}>
                        <EText style={styles.headerText}>Manage Friends</EText>
                    </View>
                    <View style={styles.options}>
                        <View style={styles.switchContainer}>
                            <Pressable onPress={()=> handleSwitch('friends')}>
                                <View style={[styles.toggleButton, styles.lButton, {backgroundColor: renderMode === 'friends'?palette.green:palette.darkgreen}]}>
                                    <EText style={styles.btnText}>My Friends (23)</EText>
                                </View>
                            </Pressable>
                            <Pressable onPress={()=> handleSwitch('invites')}>
                                <View style={[styles.toggleButton, styles.rButton, {backgroundColor: renderMode === 'invites'?palette.green:palette.darkgreen}]}>
                                    <EText style={styles.btnText}>Invites (0)</EText>
                                </View>
                            </Pressable>
                        </View>
                        <View style={styles.searchWrapper}>
                            <View style={styles.searchContainer}>
                                <FontAwesome name="search" size={24} color="black" />
                                <TextInput 
                                    style={styles.search} 
                                    onChangeText={e=> handleSearch(e)}
                                    placeholder={"Search "+renderMode}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        {
                            renderMode === 'friends' ? (
                                <FriendsList friends={DUMMY_FRIENDS}/>
                            ):(
                                <InviteList 
                                    sentInvites={DUMMY_INVITES.sentInvites}
                                    receivedInvites={DUMMY_INVITES.receivedInvites}
                                />
                            )
                        }
                    </View>
                </View>
            </SafeAreaView>
    )
}