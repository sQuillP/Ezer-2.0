import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './navigators/Rootnavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {


  console.log('runinng in app.js');

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigation/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

