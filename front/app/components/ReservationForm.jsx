"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function ReservationForm() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [numPeople, setNumPeople] = useState(1);
  const [message, setMessage] = useState("");

  const availableTimes = ["12:00", "13:00", "14:00", "19:00", "20:00", "21:00"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, numPeople }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Reserva creada con éxito");
      } else {
        setMessage(data.error || "Error al crear la reserva");
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor");
    }
  };

  return (
    <div className="reservation-form">
      <h2>Crear Reserva</h2>

      <div className="mb-4">
        <p>Selecciona una fecha:</p>
        <Calendar onChange={setDate} value={date} />
      </div>

      <div className="mb-4">
        <p>Selecciona una hora:</p>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="">Seleccione una hora</option>
          {availableTimes.map((timeSlot) => (
            <option key={timeSlot} value={timeSlot}>
              {timeSlot}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <p>Número de personas:</p>
        <input
          type="number"
          value={numPeople}
          onChange={(e) => setNumPeople(parseInt(e.target.value))}
          min="1"
        />
      </div>

      <button onClick={handleSubmit}>Confirmar Reserva</button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
