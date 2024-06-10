import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './navigators/Rootnavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { useFonts } from 'expo-font';
import { deactivateKeepAwake } from 'expo-keep-awake';
import usePushNotifications from './hooks/usePushNotifications';


const FONT_PATH = "./fonts/nunito"

export default function App() {


  console.log('runinng in app.js');

  const pushtoken = usePushNotifications();

  console.log("PUSH TOKEN", pushtoken);

  const [loaded, error] = useFonts({
    "Nunito-Regular": require(`${FONT_PATH}/Nunito-Regular.ttf`),
    "Nunito-Bold":require(`${FONT_PATH}/Nunito-Bold.ttf`),
    "Nunito-Italic":require(`${FONT_PATH}/Nunito-Italic.ttf`)
  });

  if(__DEV__ === false) {
    deactivateKeepAwake()
  }

  /**
   * TODO:
   * - notifications
   * - icons
   */

  if (!loaded) return undefined;

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigation/>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

