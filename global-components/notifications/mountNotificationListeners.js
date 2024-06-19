import { useEffect, useRef } from "react";
import * as Notifications from 'expo-notifications';


export default function mountNotificationListeners() {
    const notificationListener = useRef();
    const responseListener = useRef();



    useEffect(()=> {
        notificationListener.current = Notifications.addNotificationReceivedListener(notification=> {
            // Notification.
        })
    },[]);

}