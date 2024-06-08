import React from 'react';
import {View, Text, Button} from 'react-native';
import useAuthNavigation from '../hooks/useAuthNavigation';
import useUserStore from '../stores/user';

const Home = () => {
  const user = useUserStore(state => state.user);
  const {navigate} = useAuthNavigation();

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Login" onPress={() => navigate('Login')} />
      <Button title="Go to Protected" onPress={() => navigate('Protected')} />
      {user && user.role === 1 && (
        <View>
          <Button title="Admin panel" onPress={() => navigate('Login')} />
        </View>
      )}
    </View>
  );
};

export default Home;
