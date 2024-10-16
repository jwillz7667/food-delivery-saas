// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // General Styles
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  // Input Fields
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  // Buttons
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    height: 50,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  // Logo
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  // Order List
  orderList: {
    width: '100%',
  },
  orderItem: {
    backgroundColor: '#F2F2F2',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  orderText: {
    fontSize: 16,
  },
  // Map
  mapContainer: {
    width: '100%',
    height: 300,
    marginVertical: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default styles;
