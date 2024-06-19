import { View, TouchableOpacity } from 'react-native'
import SafeAreaView from '../../global-components/SafeAreaView/SafeAreaView'
import { StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


import styles from './styles/Settings';
import EText from '../../global-components/EText/EText';
import Accordian from './Accordian';
import EditProfileDetails from './EditProfileDetails';
import ReportBugDetails from './ReportBugDetails';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useDispatch } from 'react-redux';
import { signOut } from '../../redux/slice/authSlice';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeleteAccount from './DeleteAccount';

export default function Settings() {

    const dispatch = useDispatch();

    async function onLogout() {
        await AsyncStorage.removeItem("TOKEN");
        dispatch(signOut());
    }

    return (
        <KeyboardAwareScrollView>
            <View style={styles.main}>
                <StatusBar barStyle={'dark-content'}/>
                <Accordian 
                    expanded={true}
                    title={'Profile Settings'}
                >
                    <EditProfileDetails/>  
                </Accordian>
                {/* This needs to be implemented */}
                <Accordian
                    expanded={true}
                    title="Report a bug"
                >
                    <ReportBugDetails/>
                </Accordian>
                <TouchableOpacity onPress={onLogout} style={[styles.logoutBtn]}>
                    <MaterialIcons name="logout" style={{marginRight: 5}} size={24} color="white" />
                    <EText style={[styles.buttonText, ]}>Log Out</EText>
                </TouchableOpacity>
                <Accordian
                    expanded={false}
                    title='Delete Account'
                >
                    <DeleteAccount/>
                </Accordian>
            </View>
        </KeyboardAwareScrollView>
    )
}