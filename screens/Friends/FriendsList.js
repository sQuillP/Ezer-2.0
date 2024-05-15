import { FlatList, View } from "react-native";
import FriendItem from "./FriendItem";



export default function FriendsList({friends}) {


    return (
        <View style={{flex: 1}}>

            <FlatList
                data={friends}
                contentContainerStyle={{paddingHorizontal: 20}}
                renderItem={({item, index})=> {
                    return (
                        <FriendItem
                            friend={item}
                            last={index === friends.length-1}
                        />
                    )
                }}
                keyExtractor={(item)=> item.dateJoined}
            />
        </View>
    )
}