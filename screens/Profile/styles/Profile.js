import { Dimensions, StyleSheet } from "react-native";
import palette from "../../../global-components/palette";


export default StyleSheet.create({
    main: {
        alignItems:'center',
        justifyContent:'flex-start',
        // marginTop: '20%',
        paddingHorizontal: 15,
        flex: 1,
    },
    image: {
        height: Dimensions.get('screen').width/2,
        width: Dimensions.get('screen').width/2,
        borderRadius: 100000
    },
    profileWrapper: {
        alignItems:'center',
    },
    username: {
        textAlign:'center',
        color: palette.light,
        fontSize: 30,
        marginBottom: 20,
    },
    fullname: {
        textAlign:'center',
        color: palette.light,
        fontSize: 20
    },
    buttons: {
        marginTop: '20%',
    },
    sobrietyCounter: {
        backgroundColor: palette.light,
        padding: 15,
        borderRadius: 20,
        marginBottom: 35,
        minWidth: 150,
        alignItems:'center'
    },
    sobersince: {
        fontSize: 30,
        color:'#000000',
        textAlign:'center'
    },
    resettext: {
        textAlign:'center',
        color: palette.light,
        fontSize: 20
    },
    reset: {
        padding: 10,
        borderRadius: 20
    }
})