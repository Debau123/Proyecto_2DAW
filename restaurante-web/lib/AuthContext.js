'use client';
import { createContext, useContext, useState, useEffect } from 'react';

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticación
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario está logeado al cargar la página
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  // Función para iniciar sesión
  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);
