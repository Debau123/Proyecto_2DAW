import jwt from 'jsonwebtoken';

export async function GET(req) {
  try {
    // Obtener la cookie del request
    const cookies = req.headers.get('cookie');
    if (!cookies) {
      return new Response(
        JSON.stringify({ success: false, error: 'No autorizado: No se encontraron cookies.' }),
        { status: 401 }
      );
    }

    // Extraer el token de la cookie
    const token = cookies.split('token=')[1]?.split(';')[0];
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, error: 'No autorizado: Token no encontrado.' }),
        { status: 401 }
      );
    }

    // Verificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return new Response(
      JSON.stringify({ success: true, user: { email: decoded.email } }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al validar el token:', error.message);

    let errorMessage = 'Token inválido.';
    if (error.name === 'TokenExpiredError') {
      errorMessage = 'El token ha expirado.';
    }

    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 401 }
    );
  }
}
