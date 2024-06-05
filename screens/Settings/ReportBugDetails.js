import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

import styles from './styles/ReportBugDetails';

import EText from '../../global-components/EText/EText';
import { Ezer } from '../../http/Ezer';
import CustomModal from '../../global-components/CustomModal/CustomModal';


export default function ReportBugDetails() {

    const [bugDetails, setBugDetails] = useState('');
    const [validReport, setValidReport] = useState(false);
    const [sendingBugReport, setSendingBugReport] = useState(false);



    async function handleSubmitBugDetails(){
        try {
            setSendingBugReport(true);
            const reportResponse = await Ezer.post("/bug-report", {created: new Date().getTime().toString(), report: bugDetails});
            Alert.alert("Bug report received", "Thank you for your feedback",[{text:"No problem", onPress: ()=>null}]);
            setBugDetails('');
        } catch(error) {
            console.log('error');
        } finally {
            setSendingBugReport(false);
        }
    }


    function handleChangeText(text){
        if(text.trim() !== '')
            setValidReport(true);
        else
            setValidReport(false);
        
        setBugDetails(text);
    }


    return (
        <View style={styles.main}>
            <EText style={[styles.baseFont,{marginVertical: 10, fontSize: 16}]}>
                Please note that this application is currently in 
                <EText style={{fontFamily:'Nunito-Bold'}}> soft release.</EText> 
                &nbsp; You may experience technical problems along the way.
            </EText>
            <TextInput
                onChangeText={handleChangeText}
                value={bugDetails}
                style={styles.textarea}
                multiline={true}
                placeholder='Explain any issues you are currently facing.'
                placeholderTextColor={'rgb(90,90,90)'}
            />
            <TouchableOpacity
                style={[styles.submitBtn,{opacity:validReport === false ?0.5:1} ]}
                onPress={handleSubmitBugDetails}
                disabled={validReport === false}
            >
                <EText style={[styles.baseFont, styles.btnText]}>Submit Bug Report</EText>
            </TouchableOpacity>
        </View>
    )
}