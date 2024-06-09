import { Text } from "react-native"

/**
 * @description wraps and uses main font thorughout the application.
 * @returns 
 */
export default function EText({children, style}) {
    return (
        <Text style={[style, {fontFamily:'Nunito-Regular'}]}>
            {children}
        </Text>
    )
}