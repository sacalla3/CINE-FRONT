'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSelectionStore } from "../../../store/useSelectionStore"; // Zustand or custom hook

interface FunctionData {
  id: string;
  movie: {
    title: string;
  };
  theatre: {
    roomNumber: number;
  };
  dateTime: string;
  availableSeats: number;
}


export default function SelectFunctionButton() {
    // Define el estado para las funciones y el modal

  const [functions, setFunctions] = useState<FunctionData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { setSelectedFunctionId } = useSelectionStore(); // Zustand or custom hook
  const router = useRouter();

  const fetchFunctions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://cine-nest-production.up.railway.app/api/function', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFunctions(response.data);
    } catch (error) {
      console.error('Error al cargar funciones:', error);
    }
  };

  const handleSelect = (func: FunctionData) => {
    setSelectedFunctionId(func.id);
    setShowModal(false);
    router.push('/seats');
  };

  useEffect(() => {
  fetchFunctions();
}, []);

   return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Crear ticket
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4 text-center">Funciones disponibles</h2>
            <ul className="space-y-4">
              {functions.map((func) => (
                <li
                  key={func.id}
                  className="border p-4 rounded hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(func)}
                >
                  <p className="font-semibold">{func.movie.title}</p>
                  <p>Sala: {func.theatre.roomNumber}</p>
                  <p>Fecha: {new Date(func.dateTime).toLocaleString()}</p>
                  <p>Sillas disponibles: {func.availableSeats}</p>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:underline"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
