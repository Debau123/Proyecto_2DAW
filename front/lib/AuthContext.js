'use client';
import { createContext, useContext, useState, useEffect } from 'react';

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticación
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Guardar los datos del usuario

  useEffect(() => {
    // Validar si el usuario está logueado al cargar la aplicación
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/users/checkAuth', {
          method: 'GET',
          credentials: 'include', // Aseguramos que las cookies se envíen con la solicitud
        });

        if (res.ok) {
          const data = await res.json();
          setIsLoggedIn(true); // Usuario está logueado
          setUser(data.user); // Guardamos la información del usuario
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error al verificar la autenticación:', error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false); // Finalizamos la carga
      }
    };

    checkAuth();
  }, []);

  // Función para iniciar sesión manualmente
  const login = (token) => {
    setIsLoggedIn(true);
    setUser(token); // Guardamos los datos del usuario
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include', // Aseguramos que las cookies se borren
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);
