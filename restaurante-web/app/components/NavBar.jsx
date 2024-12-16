"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Comprueba si hay token
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/"; // Redirige al inicio
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
