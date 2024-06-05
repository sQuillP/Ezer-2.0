import { Dimensions, StyleSheet } from "react-native";
import palette from "../../../global-components/palette";


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e2e2e2'
    },
    main: {
        flex: 1
    },
    top: {
        flex: 1,
        backgroundColor: '#e2e2e2',
        position:'relative',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    image:  {
        height: Dimensions.get('window').width/2, 
        width: Dimensions.get('window').width/2,
        borderRadius: 99999,
    },
    bottom: {
        backgroundColor: palette.light,
        flex: 2,
        zIndex: -1
    },
    title: {
        textAlign:'center',
        fontSize: 30,
        marginVertical:'10%',
    },
    sobrietyCounter: {
        backgroundColor: palette.light,
        padding: 15,
        borderRadius: 20,
        marginBottom: 35,
        minWidth: 150,
        alignItems:'center',
        backgroundColor: '#e2e2e2',
    },
    sobersince: {
        fontSize: 30,
        color:'#000000',
        textAlign:'center',
        backgroundColor: '#e2e2e2',

    },
})