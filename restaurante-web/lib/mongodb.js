import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Por favor, define la variable de entorno MONGODB_URI en tu archivo .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongo() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      writeConcern: { w: 'majority' }, // Configuración correcta para un Replica Set
    });
  }

  cached.conn = await cached.promise;
  console.log('Conectado a MongoDB');
  return cached.conn;
}

export default connectMongo;
