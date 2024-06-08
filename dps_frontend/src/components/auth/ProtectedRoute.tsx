import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import useUserStore from '../../stores/user';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../Navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const user = useUserStore(state => state.user);
  console.log(user, 'Protected');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (!user) {
      navigation.replace('Login');
    }
  }, [user, navigation]);

  if (!user) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
