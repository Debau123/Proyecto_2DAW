import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  verified: { type: Boolean, default: false }, // Campo nuevo: correo verificado
  verificationToken: { type: String }, // Token de verificación
});

delete mongoose.models.User; // Forzar que el esquema se recargue
export default mongoose.models.User || mongoose.model('User', UserSchema);
