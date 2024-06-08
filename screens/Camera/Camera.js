import { CameraView } from 'expo-camera';
import { useRef, useState } from 'react';
import { Pressable, View, Image, Platform } from 'react-native';
import { AntDesign, Feather, MaterialIcons,  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setPhoto } from '../../redux/slice/dataSlice';
import styles from './styles/Camera';
import EText from '../../global-components/EText/EText';

export default function MyCamera() {

    const [image, setImage] = useState(null);
    const [cameraType, setCameraType] = useState('front');
    const camera = useRef();
    const navigation = useNavigation();
    const dispatch = useDispatch();


    const cameraOptions = {
        quality: 1,
        base64: true,
        exif: false,
    };

    async function onTakePicture() {
        if(!camera) return;
        const photo = await camera.current.takePictureAsync(cameraOptions);
        setImage(photo);
        console.log('took photo');
    }


    function onUseSelectedImage() {
        dispatch(setPhoto(image));
        navigation.goBack();
    }


    function onDeleteSelectedImage() {
        console.log('deleting selected image;')
        setImage(null);

    }

    function onFlip() {
        if(cameraType === 'front'){
            setCameraType('back');
        } else {
            setCameraType('front');
        }
    }

    return (
        image === null || image.uri === null ? (
            <CameraView
                style={{flex: 1, width: '100%', justifyContent:'flex-end'}}
                facing={cameraType}
                ref={camera}
                flash='off'
            >
                <Pressable
                    style={styles.flipBtn}
                    onPress={onFlip}
                >
                    {
                        Platform.OS === 'ios' ? (
                            <MaterialIcons name="flip-camera-ios" size={30} color={'white'} />
                        ) : (
                            <MaterialIcons name='flip-camera-android' size={30} color={'white'} />
                        )
                    }
                </Pressable>
                <Pressable
                    onPress={()=>{ 
                        navigation.goBack()
                    }}
                    style={styles.backButton}
                >
                    <EText style={styles.cameraText}>Cancel</EText>
                </Pressable>
                <View style={{alignItems:'center', marginBottom: 30}}>

                    <Pressable
                        style={styles.takePhotoBtn}
                        onPress={onTakePicture}
                    ></Pressable>
                </View>
            </CameraView>
        ):(
            <View style={styles.imageContainer}>
                <Pressable
                    onPress={onDeleteSelectedImage}
                    style={styles.deleteWrapper}
                >
                    <AntDesign name="close" size={40} color={'white'} />
                </Pressable>
                <Image
                    style={styles.image}
                    source={{uri: image.uri}}
                />
                <Pressable
                    style={styles.nextWrapper}
                    onPress={onUseSelectedImage}
                >
                    {
                        ({pressed})=> {
                            return (
                                <View  style={[styles.nextButton, {opacity: pressed ? 0.5: 1}]}>
                                    <EText style={styles.cameraText}>Proceed</EText>
                                    <Feather name="chevrons-right" size={60} color={'white'} />
                                </View>
                            )
                        }
                    }
                </Pressable>
            </View>
        )
    )
}