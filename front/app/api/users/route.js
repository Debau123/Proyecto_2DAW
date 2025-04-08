import connectMongo from '../../../lib/mongodb';
import User from '../../../lib/models/User';

export async function GET() {
  await connectMongo();

  try {
    const users = await User.find();
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al obtener usuarios' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
