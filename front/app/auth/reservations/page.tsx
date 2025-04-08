import ReservationForm from "../../components/ReservationForm";

export default function ReservationsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Reservas</h1>
      <ReservationForm />
    </div>
  );
}
