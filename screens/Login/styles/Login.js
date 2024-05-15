import { Dimensions, StyleSheet } from "react-native";
import palette from "../../../global-components/palette";

export default StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal:10
    },
    image: {
        width:'80%',
        height: 200,
        resizeMode: 'cover',
        alignSelf:'center'
    },
    input:{
        backgroundColor: palette.textField,
        padding: 15,
        fontSize: 20,
        borderRadius: 10
    },
    bottomContent: {

    },
    topContent: {

    },
    button: {
        width: Math.floor(Dimensions.get('screen').width/3),
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 10
    },
    label :{
        fontSize: 25,
        marginVertical: 10
    },
    form: {
        paddingHorizontal:30
    },
    buttons: {
        marginTop: 20,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    buttonText: {
        fontSize: 20,
        color: palette.light,
        textAlign:'center'
    },
    formItem: {
        
    }

});