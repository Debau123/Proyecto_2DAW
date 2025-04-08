'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext'; // Importa el AuthContext

export default function Login() {
  const router = useRouter();
  const { login, isLoggedIn } = useAuth(); // Accedemos a las funciones del contexto

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Redirigir si ya está logueado
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/'); // Redirige a la página principal si ya está logueado
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      const data = await res.json();

      // Llamamos al login del contexto
      login(data.user);

      router.push('/'); // Redirigir al inicio después de loguearse
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/imagen3.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Contenedor del formulario */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Bienvenido</h1>
        <p className="text-center text-gray-600 mb-6">Por favor, inicia sesión en tu cuenta</p>

        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              placeholder="Introduce tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Iniciar Sesión
          </button>
          <div className="mt-6 text-center">
            <span className="text-gray-600">¿No tienes cuenta? </span>
            <Link href="/auth/register" className="text-blue-500 hover:underline font-semibold">
              Regístrate aquí
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
