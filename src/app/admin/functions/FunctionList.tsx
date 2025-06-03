'use client'; // 👈 esto indica que es Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FunctionList() {
  const [functions, setFunctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchFunctions() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/function`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // ejemplo si guardas token en localStorage
          },
        });
        const data = await res.json();
        setFunctions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchFunctions();
  }, []);

   if (loading) return <p className="text-center text-gray-500">Cargando funciones...</p>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-white">Lista de funciones</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {functions.map((func: any) => (
          <div
            key={func.id}
            className="bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-lg font-semibold text-white">{func.movie.title}</h2>
            <p className="text-gray-300">
              Sala: {func.theatre.roomNumber ?? 'N/A'}
            </p>
            <p className="text-gray-300">
              Fecha y hora: {new Date(func.dateTime).toLocaleString()}
            </p>

            <button
              onClick={() => router.push('/admin/tickets')}
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300"
            >
              Comprar boleto
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}
