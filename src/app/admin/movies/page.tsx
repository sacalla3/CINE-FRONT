'use client'; 

import { useEffect, useState } from 'react';
import MovieModal from './MovieModal';
import { CreateMovieModal } from '@/app/components/CreateMovieModal';
import { EditMovieModal } from '@/app/components/EditMovieModal';

interface Movie {
  id: string;
  title: string;
  genre: string;
  director: string;
  duration: number;
  description: string;
  language: string;
  status: string;
  classification: string;
  imageUrl?: string;
  trailerUrl?: string;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
   useEffect(() => {
    if (typeof window !== "undefined") {
      setUserRole(localStorage.getItem('userRole'));
    }
  }, []);
 


  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch('http://localhost:3000/api/movies');
      const moviesData = await res.json();

      const enriched = await Promise.all(
    moviesData.map(async (movie: Movie) => {
        try {
        const apiKey = 'fc496e650e8081a221bf67732f5eb312';
        // 1. Buscar la película por título
        const tmdbRes = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movie.title)}`
        );
        const tmdbData = await tmdbRes.json();
        const poster = tmdbData.results?.[0]?.poster_path;
        const tmdbId = tmdbData.results?.[0]?.id;

        // 2. Buscar el trailer usando el id de TMDB
        let trailerUrl = '';
        if (tmdbId) {
            const videosRes = await fetch(
            `https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${apiKey}`
            );
            const videosData = await videosRes.json();
            const trailer = videosData.results?.find(
            (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
            );
            if (trailer) {
            trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
            }
        }

        return {
            ...movie,
            imageUrl: poster
            ? `https://image.tmdb.org/t/p/w500${poster}`
            : '/fallback.jpg',
            trailerUrl,
        };
        } catch (err) {
        console.error(`Error buscando imagen/trailer para ${movie.title}`, err);
        return { ...movie, imageUrl: '/fallback.jpg' };
        }
    })
);

      setMovies(enriched);
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white p-6">
      
      <h1 className="text-3xl font-bold mb-6">Películas</h1>
      {userRole === 'admin' && (
        <>
          <button
            className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-bold"
            onClick={() => setShowCreateModal(true)}
          >
            Crear nueva película
          </button>
          <button
            className='mb-6 ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-bold'
            onClick={() => setShowEditModal(true)}
          >
            Editar película
          </button>
        </>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-64 object-contain  "
              onClick={() => setSelectedMovie(movie)}
            />
            <div className="p-3">
              <h2 className="text-md font-semibold text cent">{movie.title}</h2>
              <p className="text-sm text-gray-400">{movie.genre}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <MovieModal
            movie={{
            title: selectedMovie.title,
            genre: selectedMovie.genre,
            duration: selectedMovie.duration + ' min',
            description: selectedMovie.description,
            trailerUrl: selectedMovie.trailerUrl,
          }}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      {showCreateModal && (
        <CreateMovieModal
          onClose={() => setShowCreateModal(false)}
          onCreated={() => {
            setShowCreateModal(false);
    
            window.location.reload(); 
          }}
        />
      )}
      {showEditModal && (
        <EditMovieModal
          movies={movies}
          onClose={() => setShowEditModal(false)}
          onUpdated={() => {
            setShowEditModal(false);
            window.location.reload();
          }}
        />
      )}

    </div>
          
  );
}
