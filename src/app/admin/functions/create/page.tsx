'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateFunctionPage() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [formData, setFormData] = useState({
    movieId: '',
    theatreId: '',
    dateTime: '',
    ticketPrice: '',
    availableSeats: '',
    status: 'activa', // valor por defecto
  });

  // Obtener la lista de películas y teatros
  useEffect(() => {
    async function fetchData() {
      try {
        const [moviesRes, theatresRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/theatre`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
        ]);

        const moviesData = await moviesRes.json();
        const theatresData = await theatresRes.json();
        setMovies(moviesData);
        setTheatres(theatresData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar datos al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convertir los campos numéricos a número
    const formattedData = {
      ...formData,
      ticketPrice: Number(formData.ticketPrice),
      availableSeats: Number(formData.availableSeats),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/function`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (res.ok) {
        alert('Función creada exitosamente!');
        router.push('/admin/functions'); // Redirige a la lista de funciones
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message || 'Error en la creación de la función'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Error al crear la función.');
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Crear nueva función</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">

        <div>
          <label className="block mb-1">Película</label>
          <select
            name="movieId"
            value={formData.movieId}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 rounded"
            required
          >
            <option value="">Seleccione una película</option>
            {movies.map((movie: any) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Sala</label>
          <select
            name="theatreId"
            value={formData.theatreId}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 rounded"
            required
          >
            <option value="">Seleccione una sala</option>
            {theatres.map((theatre: any) => (
              <option key={theatre.id} value={theatre.id}>
                Sala {theatre.roomNumber} ({theatre.type})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Fecha y hora</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Precio del boleto</label>
          <input
            type="number"
            name="ticketPrice"
            value={formData.ticketPrice}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 rounded"
            min={0}
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Asientos disponibles</label>
          <input
            type="number"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 rounded"
            min={0}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Estado</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 rounded"
            required
          >
            <option value="activa">Activa</option>
            <option value="cancelada">Cancelada</option>
            <option value="finalizada">Finalizada</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300"
        >
          Crear función
        </button>
      </form>
    </div>
  );
}
