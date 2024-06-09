import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Http = axios.create({
  baseURL: API_URL,
});

Http.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token from AsyncStorage', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default Http;
