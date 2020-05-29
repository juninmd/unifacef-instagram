import * as React from 'react';

import Home from '../containers/home';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export enum ROUTES_NAMES {
  Home = "Home",
}

function Routes() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <Stack.Navigator initialRouteName={ROUTES_NAMES.Home}>
        <Stack.Screen options={{
          headerTitleAlign: 'center',
          headerTitle: 'Unifacef Gram',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'black',
          }
        }} name={ROUTES_NAMES.Home} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;