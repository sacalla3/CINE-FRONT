'use client';

import { useEffect, useState } from 'react';
import { FaChair } from 'react-icons/fa';
import { getSeatsByFunctionId } from './services/seatService';

interface Seat {
  id: string;
  seatNumber: number;
  available: boolean;
}

const SeatsPage = () => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);
  const [functionId, setFunctionId] = useState<string | null>(null);

  useEffect(() => {
    const id = prompt('Ingresa el ID de la función:');
    if (!id) return;

    setFunctionId(id);
    getSeatsByFunctionId(id)
      .then((data) => setSeats(data))
      .catch((err) => console.error('Error al cargar sillas:', err))
      .finally(() => setLoading(false));
  }, []);

  if (!functionId) return <p className="p-4">No se proporcionó ID de función.</p>;
  if (loading) return <p className="p-4">Cargando sillas...</p>;

  // Agrupar sillas por filas de máximo 15
  const seatsPerRow = 15;
  const seatRows = Array.from({ length: Math.ceil(seats.length / seatsPerRow) }, (_, i) =>
    seats.slice(i * seatsPerRow, i * seatsPerRow + seatsPerRow)
  );

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Sillas de la función</h2>

      <div className="space-y-2">
        {seatRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {row.map((seat) => (
              <button
                key={seat.id}
                disabled={!seat.available}
                className={`flex flex-col items-center justify-center p-2 rounded text-xs text-white w-12 h-12
                  ${seat.available ? 'bg-green-600 hover:bg-green-700 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
                title={`Silla ${seat.seatNumber}`}
              >
                <FaChair className="mb-1" />
                <span>{seat.seatNumber}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatsPage;
