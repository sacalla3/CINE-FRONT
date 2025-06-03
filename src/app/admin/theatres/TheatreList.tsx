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
        const res = await fetch(`https://cine-nest-production.up.railway.app/api/theatre`, {
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
  <div className="min-h-screen bg-black p-8">
    <h1 className="text-2xl font-bold mb-6 text-blue-400">Lista de teatros</h1>
    {userRole === 'admin' && (
      <button
        onClick={() => window.location.href = '/admin/theatres/create'}
        className="mb-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow font-bold transition duration-300"
      >
        Crear nuevo teatro
      </button>
    )}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {theatres.map((theatre: any) => (
        <div
          key={theatre.id}
          className="backdrop-blur-md bg-gradient-to-br from-blue-900/70 to-gray-900/80 rounded-2xl shadow-2xl p-8 border border-blue-700 hover:scale-105 hover:shadow-blue-500/30 transition-all duration-300 flex flex-col gap-4"
        >
          <h2 className="text-3xl font-extrabold mb-2 text-blue-200 drop-shadow">Sala {theatre.roomNumber}</h2>
          <div className="flex flex-col gap-2 text-white text-lg">
            <span>
              <span className="font-semibold text-blue-400">Capacidad:</span> {theatre.capacity}
            </span>
            <span>
              <span className="font-semibold text-blue-400">Tipo:</span> {theatre.type}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}
