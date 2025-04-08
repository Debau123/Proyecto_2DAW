"use client";

import { useEffect, useState } from "react";

// Define el tipo de cada reserva
type Reservation = {
  _id: string;
  date: string;
  time: string;
  numPeople: number;
  status: string;
};

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch("/api/reservations", { method: "GET" });
        const data = await res.json();
        if (data.success) {
          setReservations(data.reservations);
        } else {
          setError(data.error || "Error al obtener las reservas");
        }
      } catch (err) {
        console.error("Error al cargar las reservas:", err);
        setError("Error en el servidor");
      }
    };

    fetchReservations();
  }, []);

  const handleCancel = async (reservationId: string) => {
    try {
      const res = await fetch(`/api/reservations/${reservationId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setReservations((prev) =>
          prev.filter((reservation) => reservation._id !== reservationId)
        );
      } else {
        alert(data.error || "No se pudo cancelar la reserva");
      }
    } catch (err) {
      console.error("Error al cancelar la reserva:", err);
      alert("Error en el servidor");
    }
  };

  return (
    <div className="reservation-list">
      <h2 className="text-2xl font-bold mb-4">Mis Reservas</h2>
      {error && <p className="text-red-500">{error}</p>}
      {reservations.length === 0 ? (
        <p>No tienes reservas activas.</p>
      ) : (
        reservations.map((reservation) => (
          <div key={reservation._id} className="reservation-card">
            <h3>Fecha: {new Date(reservation.date).toLocaleDateString()}</h3>
            <p>Hora: {reservation.time}</p>
            <p>Número de personas: {reservation.numPeople}</p>
            <p>Estado: {reservation.status}</p>
            <button
              className="btn-cancel"
              onClick={() => handleCancel(reservation._id)}
            >
              Cancelar Reserva
            </button>
          </div>
        ))
      )}
    </div>
  );
}
