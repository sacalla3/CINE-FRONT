'use client';

import { useEffect, useState } from 'react';

export default function TheatreList() {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setUserRole(localStorage.getItem('userRole'));
        }
    }, []);

  useEffect(() => {
    async function fetchTheatres() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/theatre`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setTheatres(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTheatres();
  }, []);

  if (loading) return <p>Cargando teatros...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de teatros</h1>
        {userRole === 'admin' && (
            <button
            onClick={() => window.location.href = '/admin/theatres/create'}
            className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300"
            >
            Crear nuevo teatro
            </button>
        )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {theatres.map((theatre: any) => (
          <div key={theatre.id} className="bg-gray-800 p-4 rounded shadow text-white">
            <h2 className="text-lg font-semibold mb-2">Sala {theatre.roomNumber}</h2>
            <p>Capacidad: {theatre.capacity}</p>
            <p>Tipo: {theatre.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
