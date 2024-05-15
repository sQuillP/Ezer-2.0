import { Dimensions, StyleSheet } from "react-native";
import palette from "../../../global-components/palette";


export default StyleSheet.create({
    main: {
        flex: 1
    },
    header: {
        // marginTop: '10%'
    },
    headerText: {
        fontSize: 40,
        color: palette.light,
        textAlign:'center'
    },
    switchContainer: {
        alignItems:'center',
        marginTop: 20,
        flexDirection:'row',
        justifyContent:'center',
        
    },
    btnText: {
        color: palette.light,
        textAlign:'center'
    },
    toggleButton: {
        width: Dimensions.get('screen').width/3,
        padding: 10
    },
    lButton: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderRightColor:'black',
        borderRightWidth:2
    },
    rButton: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    searchContainer: {
        flexDirection:'row',
        backgroundColor: palette.light,
        width:'80%',
        alignItems:'center',
        paddingHorizontal: 10,
        borderRadius: 10,

    },
    search: {
        backgroundColor: palette.light,
        padding: 15,
        fontSize: 18,
        flex: 1
    },
    searchWrapper: {
        alignItems:"center",
        marginTop: 10,
        paddingBottom: 10
    }
});