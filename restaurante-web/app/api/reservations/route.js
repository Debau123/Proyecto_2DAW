import connectMongo from '../../../lib/mongodb';
import Reservation from '../../../lib/models/Reservation';
import User from '../../../lib/models/User'; // Importamos el modelo de usuario

export async function POST(req) {
  try {
    await connectMongo();
    const { userId, date, numberOfGuests } = await req.json();

    // Verificar si el usuario existe
    const userExists = await User.findById(userId);
    if (!userExists) {
      return new Response(
        JSON.stringify({ error: 'El usuario no existe o no está registrado.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Crear la reserva si el usuario existe
    const reservation = await Reservation.create({ userId, date, numberOfGuests });
    return new Response(
      JSON.stringify({ message: 'Reserva creada con éxito', reservation }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error al crear la reserva', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
