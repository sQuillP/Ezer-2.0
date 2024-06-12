import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device';
import Constants from 'expo-constants';

/**
 * @description Obtain Push token credentails. This includes
 * their push notification settings and their push token details.
 * @throws {Error} When either projectId or any async function fails.
 * This will just turn off notifications for that user.
 * @returns {Object}
 */
export default async function getNotificationCredentials() {
    try {
        // No notifications if user is not using a device.
        if(Device.isDevice === false){
            throw new Error();
        }
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let pushNotificationsEnabled = null;
        if(existingStatus === 'granted'){
            pushNotificationsEnabled = 'on';
        } else {
            pushNotificationsEnabled = 'off';
        }
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if(!projectId){
            throw new Error();
        }

        const expoPushToken = await Notifications.getExpoPushTokenAsync({
            projectId
        });

        return {
            expoPushToken: expoPushToken.data,
            pushNotificationsEnabled
        };
        
    } catch(error) {
        console.log(error, error.message);
        return {
            expoPushToken: '',
            pushNotificationsEnabled:'off'
        };
    }
}