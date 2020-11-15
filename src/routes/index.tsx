import 'react-native-gesture-handler';

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Presentation from '../modules/Welcome/Presentation';

const App = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <App.Navigator
      initialRouteName="Presentation"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'gray' },
      }}
    >
      <App.Screen name="Presentation" component={Presentation} />
    </App.Navigator>
  );
};

export default Routes;
