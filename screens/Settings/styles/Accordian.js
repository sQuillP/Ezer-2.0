import { StyleSheet } from "react-native";

export default StyleSheet.create({
    accordian: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        width: '100%',
        marginVertical: 10,
        overflow:'hidden',
        borderColor:'lightgray',
        borderWidth: 1,
    },
   
    accordianHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    title: {
        fontSize:20,
        marginRight: 5
    },
    accordianContent: {

    }
});