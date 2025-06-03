'use client';

import { useEffect, useState } from 'react';
import { getFunctionById } from '../services/functionService';

interface FunctionDetailsProps {
  functionId: string;
}

export const FunctionDetails = ({ functionId }: FunctionDetailsProps) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFunctionById(functionId)
      .then(setData)
      .catch(err => console.error('Error al cargar la función:', err))
      .finally(() => setLoading(false));
  }, [functionId]);

  if (loading) return <p className="p-2">Cargando detalles...</p>;
  if (!data) return <p className="p-2">No se encontró la función.</p>;

  const formattedDate = new Date(data.dateTime).toLocaleString('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full max-w-xl mb-4">
      <h2 className="text-xl font-bold mb-2">Detalles de la Función</h2>
      <p><strong>Película:</strong> {data.movie.title}</p>
      <p><strong>Fecha y hora:</strong> {formattedDate}</p>
      <p><strong>Sala:</strong> {data.theatre.roomNumber} ({data.theatre.type})</p>
      <p><strong>Sillas disponibles:</strong> {data.availableSeats}</p>
      <p><strong>Precio por ticket:</strong> ${Number(data.ticketPrice).toLocaleString('es-CO')}</p>
    </div>
  );
};
