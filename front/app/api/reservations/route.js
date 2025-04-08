import connectMongo from '../../../lib/mongodb';
import Reservation from '../../../lib/models/Reservation';
import { getUserFromToken } from '../../../lib/auth';

export async function GET(req) {
  await connectMongo();

  try {
    // Obtener el usuario autenticado
    const user = await getUserFromToken(req.headers.get('cookie'));
    if (!user) {
      return new Response(JSON.stringify({ success: false, error: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Obtener reservas del usuario autenticado
    const reservations = await Reservation.find({ clientId: user._id });

    return new Response(
      JSON.stringify({ success: true, reservations }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al obtener reservas:', error.message);
    return new Response(
      JSON.stringify({ success: false, error: 'Error en el servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
