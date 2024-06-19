import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import storageKeys from "../global-components/storageKeys";
/* We are not caching anything. This would otherwise be very annoying for cloudwatch. */
export const Ezer = axios.create({
    baseURL: "https://ke2vr79cqb.execute-api.us-east-2.amazonaws.com/PROD",
    headers: {
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
    },
});


export const EzerForm = axios.create({
    baseURL: "https://ke2vr79cqb.execute-api.us-east-2.amazonaws.com/PROD",
    headers: {
        "Content-Type":"multipart/form-data"
    }
});



async function useInterceptor(config) {
    try {
        const token = await AsyncStorage.getItem(storageKeys.TOKEN);
        config.headers.Authorization = `bearer ${token}`;
        return config;
    } catch(error) {
        return config;
    }
}

Ezer.interceptors.request.use(useInterceptor);

