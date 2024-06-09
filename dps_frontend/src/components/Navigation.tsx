import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import Login from '../screens/Login';
import ProtectedScreens from './auth/ProtectedScreens';
import ProtectedRoute from './auth/ProtectedRoute';
import useUserStore from '../stores/user';
import Register from '../screens/Register';
import Header from './layout/Header';
import Dashboard from '../screens/Dashboard';
import Appointment from '../screens/Appointment';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Protected: undefined;
  Register: undefined;
  Dashboard: undefined;
  Appointment: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  const user = useUserStore(state => state.user);

  const screenOptions = {
    header: props => <Header {...props} />, // Render custom header for all screens
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={Home} />
        {!user && <Stack.Screen name="Login" component={Login} />}
        {!user && <Stack.Screen name="Register" component={Register} />}
        {user && <Stack.Screen name="Dashboard" component={Dashboard} />}
        {user && <Stack.Screen name="Appointment" component={Appointment} />}
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
