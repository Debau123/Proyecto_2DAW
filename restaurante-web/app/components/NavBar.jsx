"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/users/checkAuth", {
          method: "GET",
          credentials: "include", // Incluye cookies en la solicitud
        });
        if (res.ok) {
          setIsLoggedIn(true); // Usuario autenticado
        } else {
          setIsLoggedIn(false); // Usuario no autenticado
        }
      } catch (error) {
        console.error("Error al verificar sesión:", error);
        setIsLoggedIn(false); // En caso de error, no hay sesión activa
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include", // Incluye cookies en la solicitud
      });
      setIsLoggedIn(false); // Actualiza el estado
      window.location.href = "/"; // Redirige al inicio
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Restaurante
        </Link>
        <div className="space-x-4">
          <Link href="/">Inicio</Link>
          <Link href="/carta">Carta</Link>
          <Link href="/reservas">Reservas</Link>
          {!isLoggedIn ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Registro</Link>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}
