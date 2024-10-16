// DriverMap.js
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import styles from '../styles/styles';

function DriverMap({ order }) {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.error('Error getting location', error),
      { enableHighAccuracy: true, timeout: 15000 }
    );
  }, []);

  if (!currentLocation || !order) {
    return null;
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...currentLocation,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={currentLocation} title="Your Location" />
        <Marker
          coordinate={{
            latitude: order.restaurant.location.latitude,
            longitude: order.restaurant.location.longitude,
          }}
          title="Restaurant"
          pinColor="green"
        />
        <Marker
          coordinate={{
            latitude: order.deliveryAddress.location.latitude,
            longitude: order.deliveryAddress.location.longitude,
          }}
          title="Customer"
          pinColor="red"
        />
      </MapView>
    </View>
  );
}

export default DriverMap;
