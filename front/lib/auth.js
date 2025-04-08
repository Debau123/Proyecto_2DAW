import jwt from 'jsonwebtoken';
import User from './models/User'; // Asegúrate de que esta ruta sea correcta
import connectMongo from './mongodb'; // Asegúrate de que esta ruta sea correcta

export async function getUserFromToken(cookie) {
  try {
    if (!cookie) {
      return null;
    }

    // Extraer el token de la cookie correcta (sessionToken)
    const token = cookie.split('sessionToken=')[1]?.split(';')[0];
    if (!token) {
      return null;
    }

    // Verificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return null;
    }

    // Conectar a la base de datos
    await connectMongo();

    // Buscar al usuario en la base de datos
    const user = await User.findById(decoded.userId);
    if (!user) {
      return null;
    }

    return user; // Devuelve el usuario autenticado
  } catch (error) {
    console.error('Error al obtener el usuario desde el token:', error.message);
    return null;
  }
}
