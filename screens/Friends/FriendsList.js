import { FlatList, View } from "react-native";
import FriendItem from "./FriendItem";
import { useState } from "react";
import palette from "../../global-components/palette";
import { RefreshControl } from "react-native-gesture-handler";
import EText from "../../global-components/EText/EText";
import styles from './styles/InviteList'
import ListEmptyComponent from "./ListEmptyComponent";

export default function FriendsList({friends}) {

    const [refreshing, setRefreshing] = useState(false);


    function update() {
        setRefreshing(true);
        setTimeout(()=> {
            setRefreshing(false);
        }, 2000)
    }

    return (
        <View style={{flex: 1}}>
            <FlatList
                ListHeaderComponent={
                    friends.length !== 0 ? (
                    <View style={styles.header}>
                        <EText style={styles.headerText}>Friends</EText>
                    </View>):(
                        <>
                        </>
                    )
                }
                data={friends}
                contentContainerStyle={{paddingHorizontal: 20, flex: 1}}
                renderItem={({item, index})=> {
                    return (
                        <FriendItem
                            friend={item}
                            last={index === friends.length-1}
                        />
                    )
                }}
                ListEmptyComponent={
                    <ListEmptyComponent title={"No added friends"}/>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={update}
                        tintColor={palette.light}
                    />
                }
                keyExtractor={(item)=> item.dateJoined}
            />
        </View>
    )
}