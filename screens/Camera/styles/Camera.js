import { StyleSheet } from "react-native";


export default StyleSheet.create({
    main: {

    },
    backButton: {
        position: 'absolute',
        left: 25,
        top: 70,
    },
    flipBtn: {
        position: 'absolute',
        right: 25,
        top: 70,
        
    },
    takePhotoBtn: {
        height: 70, 
        width: 70,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: "white",
    },
    image: {
        alignSelf:'stretch',
        flex: 1
    },
    deleteWrapper:{
        position: 'absolute',
        left: 25,
        top: 50,
        zIndex: 2
    },
    nextWrapper: {
        position: 'absolute',
        right: 25,
        bottom: 50,
    },
    nextButton: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    cameraText: {
        color: "white",
        fontSize: 20
    },
    imageContainer: {
        flex: 1,
        position: 'relative',
    }
});