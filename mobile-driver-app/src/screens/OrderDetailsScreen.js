// OrderDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import DriverMap from '../components/DriverMap';
import { updateOrderStatus } from '../services/api.service';
import styles from '../styles/styles';

function OrderDetailsScreen({ route, navigation }) {
  const { order } = route.params;
  const [currentOrder, setCurrentOrder] = useState(order);

  const handleUpdateStatus = async (newStatus) => {
    try {
      const response = await updateOrderStatus(currentOrder._id, newStatus);
      setCurrentOrder(response.data);
      Alert.alert('Success', `Order status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      Alert.alert('Error', 'Failed to update order status');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order ID: {currentOrder._id}</Text>
      <Text>Pickup: {currentOrder.restaurant.address}</Text>
      <Text>Drop-off: {currentOrder.deliveryAddress}</Text>
      <Text>Status: {currentOrder.status}</Text>
      <DriverMap order={currentOrder} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleUpdateStatus('Picked Up')}
      >
        <Text style={styles.buttonText}>MARK AS PICKED UP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleUpdateStatus('Delivered')}
      >
        <Text style={styles.buttonText}>MARK AS DELIVERED</Text>
      </TouchableOpacity>
    </View>
  );
}

export default OrderDetailsScreen;
