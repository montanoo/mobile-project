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

export default function Register() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const setUser = useUserStore(state => state.setUser);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');

  const handleRegister = async () => {
    if (name && surname && age && phone && email && password && description) {
      try {
        User.register({
          name,
          surname,
          age,
          phone,
          email,
          password,
          description,
          role: 3,
        }).then(async res => {
          setUser(res.data);
          const token = res.data.token; // Assuming your response contains a token field
          await AsyncStorage.setItem('token', token);

          navigation.replace('Home');
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
      <Text style={styles.title}>Registrar usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
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
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Registrar con Gmail</Text>
      </TouchableOpacity>
      <Text
        onPress={() => navigation.navigate('Login')}
        style={styles.register}>
        ¿Ya tienes una cuenta? Inicia sesión aquí
      </Text>
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
