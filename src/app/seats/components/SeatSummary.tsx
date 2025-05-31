// components/SeatSummary.tsx
'use client';
import { useSelectionStore } from '../../store/useSelectionStore';
import { useEffect, useState } from 'react';
import { getFunctionById } from '../services/functionService'; // Asegúrate de tener esta función

export const SeatSummary = () => {
  const { selectedFunctionId, selectedSeatIds } = useSelectionStore();
  const [pricePerSeat, setPricePerSeat] = useState<number>(0);

  useEffect(() => {
    if (!selectedFunctionId) return;

    getFunctionById(selectedFunctionId)
      .then((func) => setPricePerSeat(func.ticketPrice))
      .catch((err) => console.error('Error al obtener función:', err));
  }, [selectedFunctionId]);

  const total = selectedSeatIds.length * pricePerSeat;

  return (
    <div className="mt-4 text-center">
      <p className="text-lg">
        Sillas seleccionadas: <strong>{selectedSeatIds.length}</strong>
      </p>
      <p className="text-lg mb-2">
        Total a pagar: <strong>${total.toFixed(2)}</strong>
      </p>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
        disabled={selectedSeatIds.length === 0}
      >
        Pagar ahora
      </button>
    </div>
  );
};
