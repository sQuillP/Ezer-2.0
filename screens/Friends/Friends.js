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
import { useSelector } from "react-redux";



export default function Friends() {


    /* Base state that holds retrieved values from API. */
    const {friends, sent_invites, received_invites } = useSelector(store => store.friends.relations);
    const invites = {
        sent_invites,
        received_invites
    };
    // const invites = DUMMY_INVITES;


    const [renderMode, setRenderMode] = useState('friends');
    const [searchTerm, setSearchTerm] = useState('');


    /* You show THIS state to the user when they are searching something. */
    const [renderedFriends, setRenderedFriends] = useState(friends);
    const [renderedInvites, setRenderedInvites] = useState(invites);

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
    const matchSearchTerm = (term)=> {
        return (friend)=> {
            return friend.lastName.toLowerCase().includes(term)|| 
            friend.firstName.toLowerCase().includes(term) || 
            friend.username.toLowerCase().includes(term)
        }
    }

    /**
     * @description There are two cases: friends, or invites. When it is friends, 
     */
    function handleSearch(term) {
        const updateTerm = term;
        term = term.toLowerCase();

        if(renderMode === 'friends') {
            if(term.trim() === '') {
                setRenderedFriends(friends);
                return;
            }
            const filteredFriends = friends.filter(matchSearchTerm(term));
            setRenderedFriends(filteredFriends);
        } else {
            if(term.trim() === '') {
                setRenderedInvites(invites);
            }
            const filteredSentInvites = invites.sent_invites.filter(matchSearchTerm(term));
            const filteredReceivedInvites = invites.received_invites.filter(matchSearchTerm(term));

            setRenderedInvites({
                sent_invites: filteredSentInvites, 
                received_invites: filteredReceivedInvites
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
                                        <EText style={styles.btnText}>My Friends ({friends.length})</EText>
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
                                    sentInvites={renderedInvites.sent_invites}
                                    receivedInvites={renderedInvites.received_invites}
                                />
                            )
                        }
                    </View>
                </View>
            </SafeAreaView>
    )
}