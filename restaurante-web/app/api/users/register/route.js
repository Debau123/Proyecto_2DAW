import connectMongo from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(req) {
  await connectMongo();
  const { name, email, password, mobile } = await req.json();

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Usuario ya existente:', email); // LOG 1
      return new Response(
        JSON.stringify({ success: false, error: 'El usuario ya existe con este correo electrónico.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generar un token de verificación único
    const verificationToken = crypto.randomBytes(32).toString('hex');
    console.log('Token generado para el usuario:', verificationToken); // LOG 2

    // Crear el usuario en la base de datos
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      verified: false,
      verificationToken,
    });
    console.log('Usuario guardado en la base de datos con token:', newUser.verificationToken); // LOG 3

    // Configuración de nodemailer para enviar el correo
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Cambia si usas otro servicio
      auth: {
        user: process.env.EMAIL_USER, // Tu correo
        pass: process.env.EMAIL_PASS, // Tu contraseña o app password
      },
    });

    const verificationUrl = `http://localhost:3000/api/users/verify?token=${verificationToken}`;
    console.log('URL de verificación enviada por correo:', verificationUrl); // LOG 4

    // Enviar el correo
    await transporter.sendMail({
      from: '"Restaurante Mar de Fulles" <noreply@restaurante.com>',
      to: email,
      subject: 'Verificación de Correo Electrónico',
      text: `Haz clic en el siguiente enlace para verificar tu correo electrónico: ${verificationUrl}`,
      html: `<p>Haz clic en el siguiente enlace para verificar tu correo electrónico:</p>
             <a href="${verificationUrl}">Verificar Correo</a>`,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Usuario registrado con éxito. Por favor, revisa tu correo para verificar tu cuenta.',
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error en el servidor:', error.message);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error al registrar usuario.',
        details: error.message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
