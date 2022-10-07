import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigation from './src/navigation/appNavigation';
import {MenuProvider} from 'react-native-popup-menu';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MenuProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen component={AppNavigation} name="AppNavigation" />
            </Stack.Navigator>
          </NavigationContainer>
        </MenuProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
