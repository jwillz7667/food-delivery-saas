// HomeScreen.js
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import OrderList from '../components/OrderList';
import { AuthContext } from '../contexts/AuthContext';
import { getAvailableOrders, updateLocation } from '../services/api.service';
import Geolocation from '@react-native-community/geolocation';
import styles from '../styles/styles';

function HomeScreen({ navigation }) {
  const { logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchAvailableOrders();
    updateDriverLocation();
    const locationInterval = setInterval(updateDriverLocation, 30000); // Update location every 30 seconds
    return () => clearInterval(locationInterval);
  }, []);

  const fetchAvailableOrders = async () => {
    try {
      const response = await getAvailableOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateDriverLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        try {
          await updateLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        } catch (error) {
          console.error('Error updating location:', error);
        }
      },
      (error) => console.error('Error getting location:', error),
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  const handleSelectOrder = (order) => {
    navigation.navigate('OrderDetails', { order });
  };

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Orders</Text>
      <OrderList orders={orders} onSelectOrder={handleSelectOrder} />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
