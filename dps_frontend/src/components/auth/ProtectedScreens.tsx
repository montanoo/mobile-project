// screens/ProtectedScreen.tsx
import React from 'react';
import {View, Text, Button} from 'react-native';
import useUserStore from '../../stores/user';

const ProtectedScreens: React.FC = () => {
  const cleanUser = useUserStore(state => state.cleanUser);

  const handleLogout = () => {
    cleanUser();
  };

  return (
    <View>
      <Text>Protected Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProtectedScreens;
