import { SectionList, View } from "react-native";
import InviteItem from './InviteItem';
import styles from './styles/InviteList';
import EText from "../../global-components/EText/EText";
import { RefreshControl } from "react-native-gesture-handler";
import { useState } from "react";
import palette from "../../global-components/palette";
import ListEmptyComponent from "./ListEmptyComponent";
import { useDispatch, useSelector } from "react-redux";

import { getRelations } from "../../redux/thunk/friendsThunk";

export default function InviteList({sentInvites, receivedInvites, onShowConfirmModal}) {


    const [refreshing, setRefreshing] = useState(false);

    const {loadingRelations} = useSelector(store => store.friends);
    const dispatch = useDispatch();

    console.log("LOADING RELATIONS", loadingRelations);

    function showRefresh() {
        setRefreshing(true)
        setTimeout(()=> {
            setRefreshing(false);
        },2000);
    }


    /* For empty case to render, you need to have empty array in the sections 
        props. We build the inviteData object and check if there is any data, otherwise,
        an empty array is fed into the sections prop in SectionList component.
    */
    function getInviteData() {
        const inviteData = [];
        if(sentInvites.length !== 0) {
            inviteData.push({title:"Sent Invites", data: sentInvites});
        }
        if(receivedInvites.length !== 0) {
            inviteData.push({title:"Received Invites", data: receivedInvites})
        }
        return inviteData;
    }



    return (
        <SectionList
            sections={getInviteData()}
            keyExtractor={item => item.username}
            renderSectionHeader={({section:{title}})=> {
                return (
                    <View style={styles.header}>
                        <EText style={styles.headerText}>{title}</EText>
                    </View>
                )
            }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={()=>{ showRefresh(); dispatch(getRelations())}}
                    tintColor={palette.light}
                />
            }
            contentContainerStyle={{paddingHorizontal: 20, flex: getInviteData().length === 0 ? 1: 'unset'}}
            ListEmptyComponent={
                <ListEmptyComponent title={"Looks like there are no invites..."}/>
            }
            renderItem={({item, section, index})=> {
                return (
                    <InviteItem
                        sent={section.title === 'Sent Invites'}
                        last={index === section.data.length-1}
                        invite={item}
                        onShowConfirmModal={onShowConfirmModal}
                    />
                )
            }}
        />
    )
}