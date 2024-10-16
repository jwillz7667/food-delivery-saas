// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthProvider } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import OrderDetailsScreen from './src/screens/OrderDetailsScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerLeft: null, title: 'Driver Dashboard' }}
          />
          <Stack.Screen
            name="OrderDetails"
            component={OrderDetailsScreen}
            options={{ title: 'Order Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
