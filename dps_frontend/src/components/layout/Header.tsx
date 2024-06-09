import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useUserStore from '../../stores/user';

const Header = () => {
  const user = useUserStore(state => state.user);
  const cleanUser = useUserStore(state => state.cleanUser);
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const navigateToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.header}>
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.gridItem} onPress={navigateToHome}>
          <Text style={styles.gridText}>Asyl.</Text>
        </TouchableOpacity>
        {user && user.role < 3 && (
          <TouchableOpacity
            style={{...styles.gridItem}}
            onPress={navigateToDashboard}>
            <Text style={styles.gridText}>New Doctor</Text>
          </TouchableOpacity>
        )}
        {!user ? (
          <TouchableOpacity
            style={{
              ...styles.gridItem,
              alignItems: 'flex-end',
            }}
            onPress={navigateToLogin}>
            <Text style={styles.gridText}>Login</Text>
          </TouchableOpacity>
        ) : (
          // Adjust the styles for the logout button
          <TouchableOpacity
            style={{
              ...styles.gridItem,
              alignItems: 'flex-end',
            }} // Combine both gridItem and gridItemRight styles
            onPress={() => cleanUser()}>
            <Text style={styles.gridText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 11,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: 'rgb(240 253 244)',
  },
  gridContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  gridItem: {
    flex: 1,
    textAlign: 'right',
  },
  gridText: {
    paddingHorizontal: 11,
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: 'black',
  },
  gridItemRight: {
    textAlign: 'right', // Align text to the right
  },
});

export default Header;
