import nodemailer from 'nodemailer';

export async function GET() {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Servidor SMTP
      port: 587,              // Puerto TLS
      secure: false,          // false para TLS, true para SSL
      auth: {
        user: process.env.EMAIL_USER, // Tu correo electrónico
        pass: process.env.EMAIL_PASS, // Contraseña de aplicaciones
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: 'Prueba de envío de correo',
      text: 'Este es un correo de prueba desde Next.js con Nodemailer.',
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: 'Correo enviado correctamente.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al enviar el correo:', error.message);
    return new Response(
      JSON.stringify({ success: false, error: 'Error al enviar correo.', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
