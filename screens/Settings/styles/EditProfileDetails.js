import { StyleSheet, Dimensions } from "react-native";
import palette from '../../../global-components/palette';


export default StyleSheet.create({
    main: {

    },
    row: {
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        marginTop: 25,
        flexDirection:'row',
        paddingBottom: 15,
    },
    labelContainer: {
        flexDirection:'row',
        marginRight: 10,
        alignItems:'center'
    },
    label: {
        fontWeight:'bold',
        fontSize:15,
    },
    required: {
        color:'red',
        marginLeft: 5
    },
    fieldWrapper: {
        flex:1,
        justifyContent:'center',
        alignItems:'flex-end',
        position:'relative'
    },
    input: {
        width: Dimensions.get('window').width*0.6,
        backgroundColor:'#eee',
        padding: 10,
        borderRadius: 5
    },
    cancelField: {
        position:'absolute',
        right: 10,
        top: 10,

    },
    noEditField: {
        flexDirection:'row',
        width: Dimensions.get('window').width*0.6,
        justifyContent:'space-between'
    },
    saveBtn: {
        padding:10,
        backgroundColor: palette.green,
        borderRadius: 5,
        marginTop: 10
    },
    profileImgContainer: {
        alignItems:'center'
    },
    imgHeader: {
        fontSize:24,
        marginVertical: 10,
        textAlign:'center',

    },
    profileImage: {
        height: 220, //Dimensions.get('window').width*0.5,
        width: 220, //Dimensions.get('window').width * 0.5,
        borderRadius:110 //(Dimensions.get('window').width *0.5)/2,
    }
})