// auth.service.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  const { token, user } = response.data.data;
  if (user.role !== 'driver') {
    throw new Error('Only drivers can access this app');
  }
  await AsyncStorage.setItem('authToken', token);
  await AsyncStorage.setItem('user', JSON.stringify(user));
  return user;
};

export const logout = async () => {
  await AsyncStorage.removeItem('authToken');
  await AsyncStorage.removeItem('user');
};

export const isAuthenticated = async () => {
  const token = await AsyncStorage.getItem('authToken');
  return !!token;
};
