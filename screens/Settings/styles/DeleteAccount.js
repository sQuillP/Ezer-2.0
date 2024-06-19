import { StyleSheet } from "react-native"
import palette from "../../../global-components/palette";

export default StyleSheet.create({
    main: {

    },
    bold: {
        fontFamily:'Nunito-Bold',
    },
    text: {
        fontSize: 16,
        marginTop: 15
    },
    btn: {
        width: '100%',
        padding: 10,
        marginTop: 10,
        borderRadius: 5
    },
    btnText: {
        textAlign:'center',
        color:'white',
        fontSize: 18
    },
    modal: {
        flex: 1,
        justifyContent:'center', 
        alignItems:'center',
        backgroundColor:'rgba(0, 0, 0, 0.6)'
    },
    modalContent: {
        backgroundColor: palette.light,
        padding: 35,
        borderRadius: 10,
        width:'90%'
    },
    modalHeader: {
        fontSize: 25
    },
    formItem: {
        marginVertical: 10
    },
    input: {
        flex: 1,
        padding: 10,
        maxWidth: 700
    },
    inputContainer: {
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#eee',
        paddingLeft: 10,
        marginTop: 15
    },
    buttonText: {
        textAlign:'center',
        fontSize: 20,
        fontWeight:'Nunito-Bold',
        color: palette.light
    }
});