import { Image, Pressable, StatusBar, View } from "react-native";

import styles from './styles/ViewProfile';
import EText from "../../global-components/EText/EText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import palette from "../../global-components/palette";
import { useState } from "react";
import { Alert } from "react-native";
import { Ezer } from "../../http/Ezer";
import { useDispatch, useSelector } from "react-redux";
import { syncRelations } from "../../redux/slice/friendsSlice";

export default function ViewProfile({navigation, route }) {

    const {user} = route.params;

    const { top, left, bottom, right} = useSafeAreaInsets();

    const [removingFriend, setRemovingFriend] = useState(false);

    const {relations} = useSelector(store => store.friends)

    const dispatch = useDispatch();



    function countSoberDays() {
        const sobrietyDate = new Date(Number(user.sobrietyDate));
        const difference = Math.floor((Date.now() - sobrietyDate)/(1000*86400));
        return difference;
    }

    async function onRemoveFriend() {
        try {
            setRemovingFriend(true);
            const friendsResponse = await Ezer.delete("/friends",{data:{username:user.username}, params:{delete_type:'friend'}});
            const updatedRelations = friendsResponse.data.data;
            dispatch(syncRelations(updatedRelations));
            navigation.goBack();
        } catch(error) {
            Alert.alert("Unable to remove friend", "Try checking your network connection",[
                {text:"OK", onPress: ()=> null},
            ])
        } finally {
            setRemovingFriend(false);
        }
    }

    console.log(relations.friends.find(u => u.username === user.username));

    return (
        <View style={[styles.container, {paddingTop: top, paddingLeft: left, paddingRight: right}]}>
            <StatusBar barStyle={'dark-content'}/>
            <View style={styles.main}>
                <View style={styles.top}>
                {
                    user.image ? (
                        <Image
                            style={styles.image}
                            source={{uri: user.image}}
                            loadingIndicatorSource={require('../../assets/png/unknown_user.jpg')}
                        />
                    ):(
                        <Image
                            style={styles.image}
                            source={require('../../assets/png/unknown_user.jpg')}
                        />
                    )
                }
                </View>
                <View style={[styles.bottom, {paddingBottom: bottom}]}>
                    <View style={{marginBottom: '20%'}}>
                        <EText style={styles.title}>@{user.username}</EText>
                        <EText style={styles.firstName}>{user.firstName} {user.lastName}</EText>
                    </View>
                    <View style={styles.sobrietyCounter}>
                        <EText style={styles.sobersince}>{countSoberDays()}</EText>
                    </View>
                    {
                        relations.friends.find(_user => _user.username === user.username) !== undefined && (
                            <View style={{flex: 1, alignItems:'flex-end', flexDirection:"row", justifyContent:'center'}}>
                                <Pressable 
                                    onPress={onRemoveFriend}
                                    style={{width: '100%', alignItems:'center'}}>
                                    {
                                        ({pressed})=> {
                                            return (
                                                <View style={[styles.unfriend, {backgroundColor: pressed ? palette.darkerror: palette.error}]}>
                                                    <EText style={{fontSize:25, textAlign:'center', color: palette.light}}>Unfriend</EText>
                                                </View>
                                            )
                                        }
                                    }
                                </Pressable>
                            </View>
                        )
                    }
                </View>
            </View>
        </View>
    );
}