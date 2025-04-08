import connectMongo from '../../../../lib/mongodb';
import Reservation from '../../../../lib/models/Reservation';
import { getUserFromToken } from '../../../../lib/auth';

export async function DELETE(req, context) {
  await connectMongo();

  try {
    // Extraer params correctamente
    const { id } = await context.params;

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: 'Parámetro de ID no proporcionado' }),
        { status: 400 }
      );
    }

    // Obtener el usuario autenticado
    const user = await getUserFromToken(req.headers.get('cookie'));
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: 'No autorizado' }),
        { status: 401 }
      );
    }

    // Buscar la reserva
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return new Response(
        JSON.stringify({ success: false, error: 'Reserva no encontrada' }),
        { status: 404 }
      );
    }

    // Verificar que la reserva pertenece al usuario autenticado
    if (reservation.clientId.toString() !== user._id.toString()) {
      return new Response(
        JSON.stringify({ success: false, error: 'No autorizado para cancelar esta reserva' }),
        { status: 403 }
      );
    }

    // Calcular si la reserva puede ser cancelada
    const reservationTime = new Date(reservation.date);
    const twelveHoursBefore = new Date(reservationTime.getTime() - 12 * 60 * 60 * 1000);
    const currentTime = new Date();

    if (currentTime > twelveHoursBefore) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'No se puede cancelar una reserva con menos de 12 horas de anticipación',
        }),
        { status: 400 }
      );
    }

    // Eliminar la reserva
    await reservation.deleteOne();

    return new Response(
      JSON.stringify({ success: true, message: 'Reserva cancelada con éxito' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al cancelar la reserva:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Error en el servidor' }),
      { status: 500 }
    );
  }
}
