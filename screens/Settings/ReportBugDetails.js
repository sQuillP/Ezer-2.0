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




export default function ReportBugDetails() {

    const [bugDetails, setBugDetails] = useState('');
    const [validReport, setValidReport] = useState(false);
    const [sendingBugReport, setSendingBugReport] = useState(false);

    async function handleSubmitBugDetails(){
        
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
            <Text style={[styles.baseFont,{marginVertical: 10, fontSize: 16}]}>
                Please note that this application is currently in 
                <Text style={{fontFamily:'Nunito-Bold'}}> soft release.</Text> 
                You may experience technical problems along the way.
            </Text>
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
                <Text style={[styles.baseFont, styles.btnText]}>Submit Bug Report</Text>
            </TouchableOpacity>
        </View>
    )
}