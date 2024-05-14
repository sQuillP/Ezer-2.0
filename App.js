import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './navigators/Rootnavigation';

export default function App() {


  console.log('runinng in app.js');

  return (
      <NavigationContainer>
        <RootNavigation/>
      </NavigationContainer>
  );
}

