import { useState } from "react"
import { 
    TouchableOpacity, 
    View,
    Text,
    Platform,
    UIManager,
    LayoutAnimation
} from "react-native"
import styles from './styles/Accordian';
import { Entypo } from '@expo/vector-icons';



/**
 * 
 * @param {{
 *  title: string,
 *  children: ReactNode,
 *  expanded:boolean,
 *  AccordianIcon: ()=> React.Node | null,
 * }} AccordianProps
 * 
 * @description Wraps content in an expandable accordian component. Used only for the Settings.js component
 * for adding UI style for users settings.
 */
export default function Accordian({title, children, expanded = false, accordianIcon = null}) {

    //Add android animations
    if(Platform.OS === 'android'){
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const [open, setOpen] = useState(expanded);

    /* Handle android animations, and set  */
    function onHandleAccordianToggle() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setOpen(!open);
    }


    return (
        <View
            style={[styles.accordian]}
        >
            <TouchableOpacity 
                style={styles.accordianHeader}
                onPress={onHandleAccordianToggle}
            >
                <View>
                    <Text style={styles.title}>{title}</Text>
                    {accordianIcon !== null && accordianIcon()}
                </View>
                <Entypo name={open?'chevron-thin-up':'chevron-thin-down'} size={24} color={'gray'}/>
            </TouchableOpacity>
            <View style={[styles.accordianContent]}>
                {open && children}
            </View>
        </View>
    )

}