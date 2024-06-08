import * as ImagePicker from 'expo-image-picker';


/**
 * @description - Call this hook to launch the expo image picker.
 * @returns an Image object or null.
 */
export default async function useImagePicker() {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if(result.canceled) return null;


    return result.assets[0];
}