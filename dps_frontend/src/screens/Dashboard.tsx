import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import User from '../requests/User';
import {useNavigation} from '@react-navigation/native';
import useUserStore from '../stores/user';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../components/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const setUser = useUserStore(state => state.setUser);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (name && email && password) {
      try {
        User.register({
          name,
          email,
          password,
          role: 2,
        })
          .then(res => {
            navigation.replace('Home');
          })
          .catch(err => {
            if (err.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log('Data:', err.response.data);
              console.log('Status:', err.response.status);
              console.log('Headers:', err.response.headers);
            } else if (err.request) {
              // The request was made but no response was received
              console.log('Request:', err.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error:', err.message);
            }
            console.log(err.config);
          });
      } catch (error: any) {
        console.error('Register Error:', error.message);
      }
    } else {
      console.log('All fields are required');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Doctor Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 44,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    alignItems: 'center',
  },
  register: {
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
});
