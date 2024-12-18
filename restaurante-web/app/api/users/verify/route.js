import connectMongo from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  try {
    // Conectar a la base de datos
    await connectMongo();

    // Obtener el token desde la URL
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return new Response(
        JSON.stringify({ success: false, error: 'Token no proporcionado.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Buscar el usuario por el token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: 'Token inválido o expirado.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Marcar el usuario como verificado
    user.verified = true;
    user.verificationToken = null; // Limpiar el token después de verificar
    await user.save();

    // Generar un token JWT
    const sessionToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token válido por 1 hora
    );

    // Configurar la cookie correctamente
    const headers = new Headers();
    headers.append(
      'Set-Cookie',
      `token=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=3600`
    );

    // Redirigir al inicio
    headers.append('Location', '/');
    return new Response(null, { status: 302, headers });
  } catch (error) {
    console.error('Error al verificar el correo:', error.message);
    return new Response(
      JSON.stringify({ success: false, error: 'Error al verificar el correo.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
