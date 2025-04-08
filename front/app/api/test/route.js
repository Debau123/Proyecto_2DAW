import connectMongo from '../../../lib/mongodb';

export async function GET(req) {
  try {
    await connectMongo();
    return new Response(JSON.stringify({ message: 'Conexión exitosa con MongoDB' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error al conectar con MongoDB', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
