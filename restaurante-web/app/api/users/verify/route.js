import connectMongo from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  await connectMongo();

  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  try {
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, error: 'Token no proporcionado.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: 'Usuario no encontrado.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (user.verified) {
      return new Response(
        JSON.stringify({ success: true, message: 'Correo ya verificado.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Actualizar el estado de verificación
    user.verified = true;
    await user.save();

    // Crear un token de sesión y configurarlo como cookie segura
    const sessionToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return new Response(null, {
      status: 302, // Redirección
      headers: {
        'Set-Cookie': `sessionToken=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`,
        Location: '/', // Redirigir al inicio
      },
    });
  } catch (error) {
    console.error('Error al verificar el token:', error.message);
    return new Response(
      JSON.stringify({ success: false, error: 'Token inválido o expirado.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
