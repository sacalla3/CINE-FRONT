import React, { useState } from 'react';

interface Movie {
  title: string;
  description: string;
  language: string;
  status: string;
}

interface EditMovieModalProps {
  movies: Movie[];
  onClose: () => void;
  onUpdated: () => void;
}

export const EditMovieModal: React.FC<EditMovieModalProps> = ({ movies, onClose, onUpdated }) => {
  const [selectedTitle, setSelectedTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [status, setStatus] = useState('Available');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cuando seleccionas una película, carga sus datos
  const handleSelect = (title: string) => {
    setSelectedTitle(title);
    const movie = movies.find(m => m.title === title);
    if (movie) {
      setDescription(movie.description);
      setLanguage(movie.language);
      setStatus(movie.status);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No autenticado. Inicie sesión como admin.');
        setLoading(false);
        return;
      }
      const res = await fetch(`http://localhost:3000/api/movies/${selectedTitle}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          description,
          language,
          status,
        }),
      });
      if (!res.ok) {
        setError('No se pudo actualizar la película');
        setLoading(false);
        return;
      }
      onUpdated();
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
        <h2 className="text-xl font-bold mb-4 text-center">Editar película</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <select
            className="w-full p-2 rounded bg-gray-800"
            value={selectedTitle}
            onChange={e => handleSelect(e.target.value)}
            required
          >
            <option value="">Selecciona una película</option>
            {movies.map(movie => (
              <option key={movie.title} value={movie.title}>
                {movie.title}
              </option>
            ))}
          </select>
          <input
            className="w-full p-2 rounded bg-gray-800"
            name="description"
            placeholder="Descripción"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            disabled={!selectedTitle}
          />
          <input
            className="w-full p-2 rounded bg-gray-800"
            name="language"
            placeholder="Idioma"
            value={language}
            onChange={e => setLanguage(e.target.value)}
            required
            disabled={!selectedTitle}
          />
          <select
            className="w-full p-2 rounded bg-gray-800"
            name="status"
            value={status}
            onChange={e => setStatus(e.target.value)}
            required
            disabled={!selectedTitle}
          >
            <option value="Available">Disponible</option>
            <option value="Unavailable">No disponible</option>
          </select>
          {error && <div className="text-red-400 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded mt-2"
            disabled={loading || !selectedTitle}
          >
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </div>
  );
};