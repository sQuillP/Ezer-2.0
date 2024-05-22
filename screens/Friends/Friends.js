import { useState } from "react";
import EText from "../../global-components/EText/EText";
import SafeAreaView from "../../global-components/SafeAreaView/SafeAreaView";
import palette from "../../global-components/palette";
import styles from './styles/FriendsStyle';
import { Keyboard, Pressable, StatusBar, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import FriendsList from "./FriendsList";
import InviteList from "./InviteList";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CustomModal from "../../global-components/CustomModal/CustomModal";

import { DUMMY_FRIENDS, DUMMY_INVITES } from "./dummyData";



export default function Friends() {

    const [renderMode, setRenderMode] = useState('friends');
    const [searchTerm, setSearchTerm] = useState('');

    const [friends, setFriends] = useState(DUMMY_FRIENDS);
    const [invites, setInvites] = useState(DUMMY_INVITES);

    const [renderedFriends, setRenderedFriends] = useState(DUMMY_FRIENDS);
    const [renderedInvites, setRenderedInvites] = useState(DUMMY_INVITES);

    //code for modal
    const [openModal, setOpenModal] = useState(false);

    /**
     * @description reset the form and the search term.
     */
    function handleSwitch(mode) {
        setRenderMode(mode);
        handleClear();
    }


    /**
     * @description returns a filtered list of users who match the term criteria in either
     * firstname, lastname, or username. This applies to both the friends list and the 
     * invites list.
     * @returns filtered list.
     */
    const filterCallback = (term)=> {
        return (friend)=> {
            return friend.lastName.toLowerCase().includes(term)|| 
            friend.firstName.toLowerCase().includes(term) || 
            friend.username.toLowerCase().includes(term)
        }
    }

    /**
     * @description all filtered invites are of type user!
     */
    function handleSearch(term) {
        const updateTerm = term;
        term = term.toLowerCase();

        if(renderMode === 'friends') {
            if(term.trim() === '') {
                setRenderedFriends(friends);
                return;
            }
            const filteredFriends = friends.filter(filterCallback(term));
            setRenderedFriends(filteredFriends);
        } else {
            if(term.trim() === '') {
                setRenderedInvites(invites);
            }
            const filteredSentInvites = invites.sentInvites.filter(filterCallback(term));
            const filteredReceivedInvites = invites.receivedInvites.filter(filterCallback(term));

            setRenderedInvites({
                sentInvites: filteredSentInvites, 
                receivedInvites: filteredReceivedInvites
            });
        }
        setSearchTerm(updateTerm);
    }

    function handleClear() {
        setSearchTerm('');
        setRenderedFriends(friends);
        setRenderedInvites(invites)
    }

    async function rejectInvite() {

    }

    /**
     * @description this function gets drilled down to each user
     * where we have fn -> list -> item = 2 levels of drilling.
     */
    function onShowConfirmModal(openState) {
        setOpenModal(openState);
    }

    return (
            <SafeAreaView style={{backgroundColor: palette.blue}}>
                <CustomModal
                    modalProps={{
                        visible:openModal,
                        onRequestClose: ()=> setOpenModal(false),
                        animationType:'slide',
                        transparent:true
                    }}
                    title={"Reject this users invite?"}
                    confirmText={"Reject"}
                    declineText={"Keep Invite"}

                />
                <StatusBar barStyle={'light-content'}/>
                <View style={styles.main}>
                    <Pressable onPress={Keyboard.dismiss}>
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
                                        value={searchTerm}
                                        onChangeText={e=> handleSearch(e)}
                                        placeholder={"Search "+renderMode}
                                    />
                                    {
                                        searchTerm.trim() && (
                                            <Pressable onPress={handleClear} style={styles.close}>
                                                <AntDesign name="close" size={24} color="black" />
                                            </Pressable>
                                        )
                                    }
                                </View>
                            </View>
                        </View>
                    </Pressable>
                    
                    <View style={{flex: 1}}>
                        {
                            renderMode === 'friends' ? (
                                <FriendsList 
                                    friends={renderedFriends}
                                />
                            ):(
                                <InviteList 
                                    onShowConfirmModal={onShowConfirmModal}
                                    sentInvites={renderedInvites.sentInvites}
                                    receivedInvites={renderedInvites.receivedInvites}
                                />
                            )
                        }
                    </View>
                </View>
            </SafeAreaView>
    )
}