// OrderList.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

function OrderList({ orders, onSelectOrder }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onSelectOrder(item)}>
      <View style={styles.orderItem}>
        <Text style={styles.orderText}>Order ID: {item._id}</Text>
        <Text style={styles.orderText}>Pickup: {item.restaurant.address}</Text>
        <Text style={styles.orderText}>Drop-off: {item.deliveryAddress}</Text>
        <Text style={styles.orderText}>Status: {item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={styles.orderList}
    />
  );
}

export default OrderList;
