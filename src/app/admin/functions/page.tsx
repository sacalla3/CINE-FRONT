"use client";
import { useEffect, useState } from "react";

interface FunctionEntity {
  id: string;
  movie: {
    id: string;
    title: string;
  };
  theatre: {
    id: string;
    name: string;
  };
  dateTime: string;
  ticketPrice: number;
  availableSeats: number;
  status: string;
}

export default function FunctionsPage() {
  const [functions, setFunctions] = useState<FunctionEntity[]>([]);

  useEffect(() => {
    const fetchFunctions = async () => {
      try {
        const response = await fetch("http://localhost:3000/functions");
        if (!response.ok) throw new Error("Error al obtener funciones");
        const data = await response.json();
        setFunctions(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFunctions();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Funciones</h1>
      {functions.length === 0 ? (
        <p>No hay funciones registradas.</p>
      ) : (
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Película</th>
              <th className="px-4 py-2">Teatro</th>
              <th className="px-4 py-2">Fecha y Hora</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Asientos Disponibles</th>
              <th className="px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {functions.map((func) => (
              <tr key={func.id} className="border-t">
                <td className="px-4 py-2">{func.movie.title}</td>
                <td className="px-4 py-2">{func.theatre.name}</td>
                <td className="px-4 py-2">
                  {new Date(func.dateTime).toLocaleString()}
                </td>
                <td className="px-4 py-2">${func.ticketPrice}</td>
                <td className="px-4 py-2">{func.availableSeats}</td>
                <td className="px-4 py-2">{func.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
