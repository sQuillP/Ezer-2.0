import { SectionList, View } from "react-native";
import InviteItem from './InviteItem';
import styles from './styles/InviteList';
import EText from "../../global-components/EText/EText";
import { RefreshControl } from "react-native-gesture-handler";
import { useState } from "react";
import palette from "../../global-components/palette";
import ListEmptyComponent from "./ListEmptyComponent";

export default function InviteList({sentInvites, receivedInvites, onShowConfirmModal}) {


    const [refreshing, setRefreshing] = useState(false);


    function update() {
        setRefreshing(true)
        setTimeout(()=> {
            setRefreshing(false);
        },2000);
    }

    return (
        <SectionList
            sections={[
                {title:"Sent Invites", data: sentInvites},
                {title:"Received Invites", data: receivedInvites}
            ]}
            keyExtractor={item => item.dateJoined}
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
                    onRefresh={update}
                    tintColor={palette.light}
                />
            }
            contentContainerStyle={{paddingHorizontal: 20}}
            ListEmptyComponent={
                <ListEmptyComponent title={"Looks like there are no invites..."}/>
            }
            renderItem={({item, section, index})=> {
                return (
                    <InviteItem
                        sent={false}
                        last={index === section.data.length-1}
                        invite={item}
                        onShowConfirmModal={onShowConfirmModal}
                    />
                )
            }}
        />
    )
}