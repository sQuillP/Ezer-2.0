import { StyleSheet } from "react-native";
import palette from "../../../global-components/palette";



export default StyleSheet.create({
    main: {
        padding: 20,
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent:'space-between'
    },
    header: {
        textAlign:'center',
        fontSize: 25
    },
    input: {
        padding: 20,
        flex: 1
    },
    inputcontainer: {
        backgroundColor: palette.light,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft: 10,
        borderColor: palette.darkgreen,
        borderWidth: 2,
        position:'relative',
    },
    clearText: {
        position:'absolute',
        top: 10,
        right: 10
    },
    button: {
        padding: 20,
        borderRadius: 10
    },
    btnText: {
        textAlign:'center',
        fontSize: 20,
        color: palette.light
    }
})