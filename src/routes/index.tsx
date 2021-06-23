import 'react-native-gesture-handler';

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Presentation from '../modules/Welcome/Presentation';
import Term from '../modules/Create/Term';
import Admin from '../modules/Meet/Admin';
import Participant from '../modules/Meet/Participant';
import HistoryCreate from '../modules/Meet/Admin/HistoryCreate';
import Location from '../modules/Meet/Location';

const App = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <App.Navigator
      initialRouteName="Location"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#222533' },
      }}
    >
      <App.Screen name="Presentation" component={Presentation} />
      <App.Screen name="Term" component={Term} />
      <App.Screen name="Admin" component={Admin} />
      <App.Screen name="HistoryCreate" component={HistoryCreate} />
      <App.Screen name="Location" component={Location} />
      <App.Screen name="Participant" component={Participant} />
    </App.Navigator>
  );
};

export default Routes;
