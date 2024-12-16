import connectMongo from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';
import bcrypt from 'bcrypt';

export async function POST(req) {
  await connectMongo();
  const { email, password } = await req.json();

  try {
    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Comparar contraseñas
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Contraseña incorrecta' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Retornar éxito
    return new Response(JSON.stringify({ message: 'Inicio de sesión exitoso', user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al iniciar sesión', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}