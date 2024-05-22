import { StyleSheet } from "react-native"

export default StyleSheet.create({
    main: {
        padding: 15,
        
    },
    IOSShadow: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    androidShadow: {
        elevation: 20,
        shadowColor: '#52006A',
    },
    baseFont: {
        fontFamily:'Nunito-Regular'
    },
    logoutBtn: {
        padding:10,
        backgroundColor: 'red',
        borderRadius: 5,
        marginTop: 10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    buttonText: {
        color:'white',
        fontFamily:'Nunito-Bold',
        textAlign:'center'
    },
})