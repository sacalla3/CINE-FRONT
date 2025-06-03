// components/SeatSummary.tsx
'use client';
import { useSelectionStore } from '../../store/useSelectionStore';
import { useEffect, useState } from 'react';
import { getFunctionById } from '../services/functionService'; // Asegúrate de tener esta función
import { UserSelector} from './UserSelector'; // Asegúrate de tener este componente
import axios from 'axios';
import { useRouter } from 'next/navigation'; // ✅ IMPORTACIÓN


export const SeatSummary = () => {
    const router = useRouter(); // ✅ INICIALIZA

  const { selectedFunctionId, selectedSeatIds } = useSelectionStore();
  const [pricePerSeat, setPricePerSeat] = useState<number>(0);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const functionId = useSelectionStore((state) => state.selectedFunctionId);
  const clearSelection = useSelectionStore((state) => state.clearSelection);

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('userRole');
      setUserRole(role);
    } 
  }, []);



  const [showUserSelector, setShowUserSelector] = useState(false);
  const handleBuyNow = async () => {
  if (userRole === 'client') {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // asegúrate de guardar esto en login
      if (!token || !userId) throw new Error('Token o usuario no encontrado');

      await axios.post(
        'http://localhost:3000/api/tickets',
        {
          functionId,
          userId,
          seatIds: selectedSeatIds,
          status: 'valido',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Boletos creados con éxito');
      clearSelection();
      router.refresh();
    } catch (error: any) {
      console.error('Error al crear los boletos:', error.response?.data || error.message);
      alert('Error al crear boletos');
    }
  } else {
    setShowUserSelector(true); // admin o seller
  }
};


  useEffect(() => { 
    if (!selectedFunctionId) return;

    getFunctionById(selectedFunctionId)
      .then((func) => setPricePerSeat(func.ticketPrice))
      .catch((err) => console.error('Error al obtener función:', err));
  }, [selectedFunctionId]);

  const total = selectedSeatIds.length * pricePerSeat;

  const handleUserSelect = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token no encontrado');

      await axios.post(
        'http://localhost:3000/api/tickets',
        {
          functionId,
          userId,
          seatIds: selectedSeatIds,
          status: 'valido',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Boletos creados con éxito');
      clearSelection(); // Limpia las sillas seleccionadas
      setShowUserSelector(false); // Cierra el modal
      router.refresh(); 
    } catch (error: any) {
      console.error('Error al crear los boletos:', error.response?.data || error.message);
      alert('Error al crear boletos');
    }
  };

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
        onClick={handleBuyNow}
      >
        Pagar ahora
      </button>
      
        {showUserSelector && (
          <UserSelector onSelectUser={handleUserSelect}
  onClose={() => setShowUserSelector(false)}/>
          
          )}
      

    </div>
  );
};
