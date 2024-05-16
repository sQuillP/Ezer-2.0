import { StyleSheet } from "react-native";
import palette from "../../../global-components/palette";


export default StyleSheet.create({
    main: {
        flex: 1,
        justifyContent:'space-around', 
        alignItems:'center',

    },
    content: {

    },
    title: {
        fontSize: 30,
        color: palette.light,
        textAlign:'center'
    },
    button: {
        padding: 15,
        borderRadius: 30,
    },
    buttonText: {
        fontSize: 18,
        color:palette.light,
        textAlign:'center'
    }
});