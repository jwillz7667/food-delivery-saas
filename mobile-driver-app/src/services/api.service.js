// api.service.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fetch available orders for the driver
export const getAvailableOrders = async () => {
  return await apiClient.get('/drivers/orders');
};

// Update driver's current location
export const updateLocation = async (coords) => {
  return await apiClient.put('/drivers/location', coords);
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  return await apiClient.put(`/drivers/orders/${orderId}/status`, { status });
};

// Additional API methods as needed
