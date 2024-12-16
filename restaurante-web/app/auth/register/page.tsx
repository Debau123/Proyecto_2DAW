'use client';

export default function Register() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/imagen3.jpg")',
        }}
      ></div>

      {/* Overlay oscuro para mejorar el contraste */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Contenido del formulario */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-500">Regístrate</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              placeholder="Introduce tu nombre"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              placeholder="Introduce tu correo"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium">
              Número de Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Introduce tu número de teléfono"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Introduce tu contraseña"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirma tu contraseña"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-gray-700 text-center">
          ¿Ya tienes cuenta?{' '}
          <a href="/auth/login" className="text-blue-500 font-medium hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
