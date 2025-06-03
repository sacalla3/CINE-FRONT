'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTheatrePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    roomNumber: '',
    capacity: '',
    type: '2D',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://cine-nest-production.up.railway.app/api/theatre`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          roomNumber: parseInt(formData.roomNumber, 10),
          capacity: parseInt(formData.capacity, 10),
          type: formData.type,
        }),
      });

      if (res.ok) {
        alert('Teatro creado exitosamente!');
        router.push('/admin/theatres');
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      alert('Error al crear el teatro.');
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Crear nuevo teatro</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Número de sala</label>
          <input
            type="number"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            min="1"
            required
            className="w-full p-2 bg-gray-800 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Capacidad</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            min="1"
            required
            className="w-full p-2 bg-gray-800 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Tipo</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-800 rounded"
          >
            <option value="2D">2D</option>
            <option value="3D">3D</option>
            <option value="VIP">VIP</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300"
        >
          Crear teatro
        </button>
      </form>
    </div>
  );
}
