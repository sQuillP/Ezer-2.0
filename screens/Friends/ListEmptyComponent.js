import { Pressable, View } from "react-native";
import EText from "../../global-components/EText/EText";
import { useNavigation } from "@react-navigation/native";
import styles from './styles/ListEmptyComponent';
import palette from "../../global-components/palette";



export default function ListEmptyComponent({title}) {

    const navigation = useNavigation();

    return (
        <View style={styles.main}>
                <EText style={styles.title}>{title}</EText>
                <Pressable onPress={()=> null}>
                {
                    ({pressed})=> {
                        return (
                            <View style={[styles.button, {backgroundColor: pressed? palette.darkgreen:palette.green}]}>
                                <EText style={styles.buttonText}>Tap to start adding friends</EText>
                            </View>
                        )
                    }
                }
                </Pressable>
        </View>
    )
}