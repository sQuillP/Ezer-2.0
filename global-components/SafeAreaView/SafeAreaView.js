import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


/**
 * @description This will wrap components that need a safearea view.
 * @returns 
 */
export default function SafeAreaView({children, style}) {
    const { top, left, bottom, right} = useSafeAreaInsets();
    return (
        <View
            style={{
                ...style,
                flex: 1,
                paddingTop: top,
                paddingLeft: left,
                paddingBottom: bottom,
                paddingRight: right
            }}
        >
            {children}
        </View>
    )
}