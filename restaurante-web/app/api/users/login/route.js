import connectMongo from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  await connectMongo();

  const { email, password } = await req.json();

  try {
    // Lógica de autenticación
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: 'Usuario no encontrado.' }),
        { status: 404 }
      );
    }

    if (!user.verified) {
      return new Response(
        JSON.stringify({ success: false, error: 'El correo electrónico no está verificado.' }),
        { status: 403 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return new Response(
        JSON.stringify({ success: false, error: 'Contraseña incorrecta.' }),
        { status: 401 }
      );
    }

    // Crear el token de sesión y configurarlo como cookie segura
    const sessionToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          'Set-Cookie': `sessionToken=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Error en el servidor.' }),
      { status: 500 }
    );
  }
}
