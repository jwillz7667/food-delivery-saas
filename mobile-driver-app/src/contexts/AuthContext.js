// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { login as authLogin, logout as authLogout, isAuthenticated } from '../services/auth.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    (async () => {
      const authStatus = await isAuthenticated();
      setAuthenticated(authStatus);
      if (authStatus) {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        setDriver(user);
      }
    })();
  }, []);

  const login = async (email, password) => {
    const userData = await authLogin(email, password);
    setAuthenticated(true);
    setDriver(userData);
  };

  const logout = async () => {
    await authLogout();
    setAuthenticated(false);
    setDriver(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated, driver, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
