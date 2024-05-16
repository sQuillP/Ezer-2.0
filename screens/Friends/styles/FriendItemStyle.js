import { StyleSheet } from "react-native";
import palette from "../../../global-components/palette";

export default StyleSheet.create({
    main: {
        padding: 10,
        flexDirection:'row'
    },
    last: {
        borderBottomColor:"darkgray",
        borderBottomWidth: 2,
    },
    image: {
        resizeMode:'cover',
        height:70,
        width: 70,
        borderRadius: 100
    },
    contentContainer: {
        marginLeft: 15,
        justifyContent:'space-between'
    },
    topText: {
        color: palette.light,
        fontSize: 20,
        width: 220,
        paddingTop: 10
    },
    bottomText: {
        color: palette.light,
        marginTop: 10
    },
    chip: {
        padding: 5,
        borderRadius: 5,
    },
    bottomContent: {
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center'
    },
    chipText: {
        color: palette.light
    },
    btns: {
        flexDirection:'row',
    
    }
})