import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  numberOfGuests: { type: Number, required: true },
});

const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema);

export default Reservation;
