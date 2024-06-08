import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import Login from '../screens/Login';
import ProtectedScreens from './auth/ProtectedScreens';
import ProtectedRoute from './auth/ProtectedRoute';
import useUserStore from '../stores/user';
import Register from '../screens/Register';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Protected: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  const user = useUserStore(state => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={Home} />
        {!user && <Stack.Screen name="Login" component={Login} />}
        {!user && <Stack.Screen name="Register" component={Register} />}
        <Stack.Screen name="Protected">
          {() => (
            <ProtectedRoute>
              <ProtectedScreens />
            </ProtectedRoute>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
