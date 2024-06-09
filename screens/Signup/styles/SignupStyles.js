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
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
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
        borderRadius: 10,
        width: '90%',
        paddingVertical: 10,
        justifyContent:'center',
        paddingHorizontal: 10
    },
    signupText: {
        fontSize: 25,
        color:palette.light,
    },
    account: {
        fontSize: 20,
        marginVertical: 10
    },
    imageContainer: {
        alignItems:'center',
        marginTop: 20
    },
    profileImage: {
        height: 170,
        width: 170,
        borderRadius: 1000,
        borderWidth: 4,
        borderColor: "gray"
    }

});