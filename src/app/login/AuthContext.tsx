'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch('https://cine-nest-production.up.railway.app/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) throw new Error('Credenciales incorrectas');

    const data = await res.json();
    console.log('Login response:', data);
    const token = data.accessToken.accessToken[0];
    const userId = data.id;
    const userRole = Array.isArray(data.role) ? data.role[0] : undefined;


    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
