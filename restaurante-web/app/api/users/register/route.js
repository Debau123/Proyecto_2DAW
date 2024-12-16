import connectMongo from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';
import bcrypt from 'bcrypt';

export async function POST(req) {
  await connectMongo();
  const { name, email, password, mobile } = await req.json(); // Extraer 'mobile'

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      mobile // Guardar 'mobile'
    });

    return new Response(JSON.stringify({ message: 'Usuario registrado con éxito', user }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al registrar usuario', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


