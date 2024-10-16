// location.service.js
import Geolocation from '@react-native-community/geolocation';

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 15000 }
    );
  });
};
