import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';



/**
 * @description helper function for usePushNotifications() function.
 * @returns 
 */
async function registerForPushNotificationsAsync() {

    // console.log('new project id', Constants.expoConfig.extra.eas.projectId);
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;

      }
      if (finalStatus !== 'granted') {
        handleRegistrationError('Permission not granted to get push token for push notification!');
        return;
      }
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        handleRegistrationError('Project ID not found');
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId
          })
        ).data;
        console.log(pushTokenString);
        return pushTokenString;
      } catch (e) {
        handleRegistrationError(`${e}`);
      }
    } else {
      handleRegistrationError('Must use physical device for push notifications');
    }
  }



  /**
   * @description use at the top level of the app. Listen to push notifications...
   * @returns 
   */
  export default function usePushNotifications() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState("");

    const notificationListener = useRef();
    const responseListener = useRef();


    useEffect(()=> {
        registerForPushNotificationsAsync()
            .then(pushToken => { console.log("push token::: ",pushToken); setExpo(pushToken)})
            .catch(error=> setExpoPushToken(""));

        // Probably don't need these two listeners...
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return ()=> {
            if(notificationListener.current){
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if(responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        }

    },[]);


    return expoPushToken;

  }