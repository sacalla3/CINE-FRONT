import React, { useState } from 'react';

interface CreateMovieModalProps {
  onClose: () => void;
  onCreated: () => void;
}

export const CreateMovieModal: React.FC<CreateMovieModalProps> = ({ onClose, onCreated }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    director: '',
    releaseDate: '',
    genre: '',
    duration: '',
    language: '',
    status: 'Available',
    classification: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            if (!token) {
            setError('No autenticado. Inicie sesión.');
            setLoading(false);
            return;
            }
            const res = await fetch('https://cine-nest-production.up.railway.app/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...form,
                duration: Number(form.duration),
            }),
            });
            if (!res.ok) {
            setError('No se pudo crear la película');
            setLoading(false);
            return;
            }
            onCreated();
            onClose();
        } catch {
            setError('Error de red');
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative bg-black text-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <button
          className="absolute top-2 right-2 text-blue-500 hover:text-blue-700 z-10 text-2xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Crear nueva película</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
            <input className="w-full p-2 rounded bg-gray-800" name="title" placeholder="Título" value={form.title} onChange={handleChange} required />
            <input className="w-full p-2 rounded bg-gray-800" name="description" placeholder="Descripción" value={form.description} onChange={handleChange} required />
            <input className="w-full p-2 rounded bg-gray-800" name="director" placeholder="Director" value={form.director} onChange={handleChange} required />
            <input className="w-full p-2 rounded bg-gray-800" name="releaseDate" type="date" placeholder="Fecha de estreno" value={form.releaseDate} onChange={handleChange} required />
            <select
                className="w-full p-2 rounded bg-gray-800"
                name="genre"
                value={form.genre}
                onChange={handleChange}
                required
            >
                <option value="">Selecciona un género</option>
                <option value="Action">Acción</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedia</option>
                <option value="Horror">Terror</option>
                <option value="Sci-Fi">Ciencia Ficción</option>
                <option value="Romance">Romance</option>
            </select>
            <input className="w-full p-2 rounded bg-gray-800" name="duration" type="number" placeholder="Duración (minutos)" value={form.duration} onChange={handleChange} required />
            <input className="w-full p-2 rounded bg-gray-800" name="language" placeholder="Idioma" value={form.language} onChange={handleChange} required />
            <select className="w-full p-2 rounded bg-gray-800" name="status" value={form.status} onChange={handleChange}>
                <option value="Available">Disponible</option>
                <option value="Unavailable">No disponible</option>
            </select>
            <input className="w-full p-2 rounded bg-gray-800" name="classification" placeholder="Clasificación" value={form.classification} onChange={handleChange} required />
            {error && <div className="text-red-400 text-center">{error}</div>}
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded mt-2"
                disabled={loading}
            >
                {loading ? 'Creando...' : 'Crear'}
            </button>
        </form> 
      </div>
    </div>
  );
};