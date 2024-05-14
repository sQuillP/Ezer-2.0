import { StyleSheet } from "react-native";
import palette from "../../../global-components/palette";
export default StyleSheet.create({
    main: {
        flex: 1
    },
    input:{
        backgroundColor: palette.textField,
        padding: 15,
        fontSize: 20,
        borderRadius: 10
    },
    label :{
        fontSize: 25,
        marginVertical: 10
    },
    header: {
    },
    headerText: {
        textAlign:'center',
        fontSize: 40
    },
    form: {
        marginHorizontal: 20,
        marginTop: 30,
        flex: 1
    },
    formItem: {

    },
    signup: {
        flexDirection:'row',
        alignItems:'center',
        borderRadius: 10
    },
    signupText: {
        fontSize: 30,
        color:palette.light,
        paddingVertical: 10,
        paddingHorizontal: 50,
    },
    account: {
        fontSize: 20,
        marginVertical: 10
    }

});