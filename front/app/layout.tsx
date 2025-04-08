"use client"; // Esto convierte el archivo en un componente cliente

import './globals.css';
import { ReactNode } from 'react'; // Importamos el tipo ReactNode
import { useAuth, AuthProvider } from '../lib/AuthContext'; // Importa el AuthContext

// Navbar como un componente separado
const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between bg-blue-500 px-8 py-4 text-white">
      <div className="text-2xl font-bold">Restaurante Mar de Fulles</div>
      <div className="flex space-x-6">
        <a href="/" className="hover:underline">Inicio</a>
        <a href="/auth/carta" className="hover:underline">Carta</a>
        {isLoggedIn && (
          <a href="/auth/my-reservations" className="hover:underline">Mis Reservas</a>
        )}
        {isLoggedIn && (
          <a href="/auth/reservations" className="hover:underline">Reservas</a>
        )}
        {isLoggedIn ? (
          <button onClick={logout} className="hover:underline">Logout</button>
        ) : (
          <>
            <a href="/auth/login" className="hover:underline">Login</a>
            <a href="/auth/register" className="hover:underline">Registro</a>
          </>
        )}
      </div>
    </nav>
  );
};

// Añadimos el tipo para `children`
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar /> {/* Incluye el Navbar */}
          {/* Contenido principal */}
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
