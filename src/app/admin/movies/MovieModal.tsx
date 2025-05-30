import React from 'react';

interface Movie {
  title: string;
  genre: string;
  duration: string;
  description: string;
  trailerUrl?: string;
}

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  // Extraer el ID del video de YouTube
  let youtubeId = '';
  if (movie.trailerUrl) {
    const match = movie.trailerUrl.match(/v=([^&]+)/);
    youtubeId = match ? match[1] : '';
  }

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-1000">
    <div className="relative bg-black text-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
      <button
        className="absolute top-2 right-2 text-blue-500 hover:text-blue-700 z-10 text-2xl font-bold"
        onClick={onClose}
      >
        ✕
      </button>
      <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
      <p className="text-sm font-bold text-gray-300 mb-1">{movie.genre} • {movie.duration}</p>
      <p className="mb-4 font-bold">{movie.description}</p>
      {youtubeId && (
        <div className="aspect-video w-full rounded-lg overflow-hidden shadow mb-2">
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title="Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}
    </div>
  </div>
);
}

export default MovieModal;