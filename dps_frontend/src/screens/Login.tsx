import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import User from '../requests/User';
import {useNavigation} from '@react-navigation/native';
import useUserStore from '../stores/user';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../components/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const setUser = useUserStore(state => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await User.login({email, password});
        const token = response.data.token; // Assuming your response contains a token field

        // Save the token to AsyncStorage
        await AsyncStorage.setItem('token', token);

        setUser(response.data);
        navigation.replace('Home');
      } catch (error) {
        console.error('Login Error:', error.message);
      }
    } else {
      console.log('Email and password must not be empty');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={{...styles.buttonText}}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={{...styles.buttonText}}>Gmail</Text>
      </TouchableOpacity>
      <Text
        onPress={() => navigation.navigate('Register')}
        style={styles.register}>
        ¿Aún no tienes una cuenta?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 22,
    gap: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
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
