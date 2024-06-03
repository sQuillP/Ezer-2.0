import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './navigators/Rootnavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
export default function App() {


  console.log('runinng in app.js');

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

