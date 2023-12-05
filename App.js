import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
// import UserNavigator from '././navigation/UserNavigator';
import Main from './navigation/Main';
import Auth from "./context/store/Auth";
import Toast from "react-native-toast-message";
// import TabNavigator from './navigation/TabNavigator';

export default function App() {
  return (
    <Auth>
      <NavigationContainer>
          <Main/>
          <Toast/>
      </NavigationContainer>
    </Auth>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
